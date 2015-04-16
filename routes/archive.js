var useful = require('../lib/useful.js')
var config = require('../package')
var path = require('path')
var moment = require('moment')
var url = require('url')


var Archive = function (req, res, next) {
	useful.buildUpdates(20, function (err, results) {
		if (err) {
			res.send(err)
		} else {
			res.render('archive', results)
		}
	})
}

module.exports = Archive
