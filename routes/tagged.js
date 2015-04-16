var express = require('express')
var useful = require('../lib/useful.js')
var router = express.Router()
var config = require('../package')
var path = require('path')
var moment = require('moment')
var url = require('url')

router.get("/*", function (req, res, next) {
	var tag = req.params[0]

	useful.buildUpdates(20, function (err, results) {
		if (err) {
			res.send(err)
		} else {
			var filtered = []
			for(var i in results.updates) {
				var u = results.updates[i]
				for(var j in u.tags) {
					var t = u.tags[j]
					if(t == tag) {
						filtered.push(u)
					}
				}
			}

			res.render('archive', {
				tags: true,
				updates: filtered,
				tag: tag
			})
		}
	})
})

module.exports = router
