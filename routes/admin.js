var express = require('express')
var useful = require('../lib/useful.js')
var fs = require('fs')
var config = require('../package')
var router = express.Router()
var defaults = require('../lib/defaults.js')
var path = require('path')

router.get('/login', function(req, res) {
	res.render("admin/login")
})

router.get('/', function(req, res) {
	useful.buildUpdates(99999, function(err, results) {
		console.log("FUCK SHIT FUCK SHIT")
		if (err) {
			console.log(err)
		} else {
			console.log(results)
		}

		res.render("admin/panel", results)
	})
})

module.exports = router
