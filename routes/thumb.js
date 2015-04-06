var express = require('express')
var async = require('async')
var gm = require('gm').subClass({imageMagick: true})
var useful = require('../lib/useful.js')
var fs = require('fs')
var config = require('../package')
var router = express.Router()
var defaults = require('../lib/defaults.js')
var path = require('path')

router.get('/*', function(req, res) {
	
	var file, grepResult, num, dest

	async.waterfall([
		function (callback) {
			num = parseInt(req.params[0])

			useful.fileGrep(
				{ pathName: defaults.privatePagesPath,
					query: num }, 
				callback
			)
		},
		function (results, callback) {
			file = results.pathName + results.selected 
			dest = path.join(defaults.privateThumbDir, num + ".png")

			grepResult = results

			if ( path.extname(file) == ".svg" ) {
				console.log('svg detected')

				gm(file).write(dest, function (err) {
					file = dest
					callback(err)
				})
			} else {
				callback()
			}
		}, 
		function (callback) {
			console.log(file)
			gm(file).size(callback)
		},
		function (sizeResult, callback) {

			var width = sizeResult.width
			var height = sizeResult.width
			var finalSize = height

			if (width > height) {
				finalSize = height
			}

			var st = gm(file)
				.crop(finalSize, finalSize)
				.resize(150, 150)
				.write(dest, function (err) {
					callback(err, dest)
				})

		}, function (dest, callback) {
			fs.readFile(dest, function(err, result) {
				callback(err, result)
			})
		}
	], function (err, result) {
		if (err) {
			res.status(404).send(err)
		} else {
			console.log('alwsf;lksdafl;kasdf;kl ')
			// http://stackoverflow.com/a/18857838
			// res.send(JSON.stringify(result, null, 2))
			res.send(result)
		}
	})
})

module.exports = router
