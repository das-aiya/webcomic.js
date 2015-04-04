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
	res.render("admin/panel")
})

module.exports = router
