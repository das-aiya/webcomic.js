var useful = require('../lib/useful.js')
var config = require('../package')
var path = require('path')
var moment = require('moment')

var xlmns = {
		'xmlns:content': "http://purl.org/rss/1.0/modules/content/" ,
		// 'xmlns:wfw': "http://wellformedweb.org/CommentAPI/",
		// 'xmlns:dc': "http://purl.org/dc/elements/1.1/",
		// 'xmlns:atom': "http://www.w3.org/2005/Atom",
		// 'xmlns:sy': "http://purl.org/rss/1.0/modules/syndication/",
		// 'xmlns:slash': "http://purl.org/rss/1.0/modules/slash/"
}

renderRSS = function (req, res, next) {
	useful.buildUpdates(20, function (err, results) {
		if (err) {
			res.send(err)
		} else {
			results.xlmns = xlmns
			results.config = config
			results.path = path
			results.moment = moment
			res.render('rss', results)
		}
	})
}

module.exports = renderRSS
