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
	
	var file, grepResult, num, dest, genNew

	async.waterfall([
		function (callback) {
			num = parseInt(req.params[0])

			useful.fileGrep(
				{ pathName: defaults.privateThumbDir,
					query: num }, 
				callback
			)
		},
		function (results, callback) {

			if (!results.selected) {
				useful.fileGrep({
					pathName: defaults.privatePagesPath,
					query: num
				}, callback)
			} else {
				callback(null, results)
			}
		},
		function (results, callback) {

			file = path.join(results.pathName, results.selected)
			dest = path.join(defaults.privateThumbDir, num + ".png")
			grepResult = results

			if(file == dest) {
				genNew = false
			} else {
				genNew = true
			}

			callback()
		}, 
		function (callback) {
			gm(file).size(callback)
		},
		function (sizeResult, callback) {

			var width = sizeResult.width
			var height = sizeResult.width
			var finalSize = height

			if (width > height) {
				finalSize = height
			}

			if (genNew) {
				var st = gm(file)
					.crop(finalSize, finalSize)
					.resize(150, 150)
					.write(dest, function (err) {
						callback(err, dest)
					})
			} else {
				callback(null, dest)
			}

		}, function (dest, callback) {
			fs.readFile(dest, function(err, result) {
				callback(err, result)
			})
		}
	], function (err, result) {
		if (err) {
			console.log(err)
			res.status(404).send(err)
		} else {
			// http://stackoverflow.com/a/18857838
			res.send(result)
			// res.send(JSON.stringify(result, null, 2))
		}
	})
})

module.exports = router
