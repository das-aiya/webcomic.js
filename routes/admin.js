var express = require('express')
var async = require('async')
var yaml = require('js-yaml')
var marked = require('marked')
var useful = require('../lib/useful.js')
var fs = require('fs')
var config = require('../package')
var router = express.Router()
var defaults = require('../lib/defaults.js')
var path = require('path')

var mainDir = path.dirname(process.mainModule.filename)
var privatePagesPath = path.join(mainDir, defaults.privatePagesPath)

router.get('/login', function(req, res) {
	res.render("admin/login")
})

router.get('/edit/*', function(req, res) {
	var num = req.params[0]
	var fileName
	
	async.waterfall([
		function (callback) {
			useful.fileGrep({
				pathName: privatePagesPath,
				query: num
			}, callback)
		}, 
		function (results, callback) {
			fileName = results.selected
			useful.dataGet(results.selected, callback)
		}
	], function (err, results) {
		if (err) {
			console.log(err)
		} else {
			res.render('admin/edit', { 
				yamlData: yaml.safeLoad(results[1]),
				mdData: results[0],
				fileName: path.join("/", defaults.privateThumbDir, fileName),
				num: num
			})
		}
	})
})

router.get('/', function(req, res) {
	useful.buildUpdates(99999, function(err, results) {
		if (err) {
			console.log(err)
		} else {
			results.updateString 
				= JSON.stringify(results.updates, null, 2)
			res.render("admin/panel", results)
		}
	})
})

module.exports = router
