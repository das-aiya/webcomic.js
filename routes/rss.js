var useful = require('../lib/useful.js')

var xlmns = {
		'xmlns:content': "http://purl.org/rss/1.0/modules/content/" ,
		'xmlns:wfw': "http://wellformedweb.org/CommentAPI/",
		'xmlns:dc': "http://purl.org/dc/elements/1.1/",
		'xmlns:atom': "http://www.w3.org/2005/Atom",
		'xmlns:sy': "http://purl.org/rss/1.0/modules/syndication/",
		'xmlns:slash': "http://purl.org/rss/1.0/modules/slash/"
}

renderRSS = function (req, res, next) {
	useful.buildUpdates(20, function (err, results) {
		if (err) {
			res.send(err)
		} else {
			results.xlmns = xlmns
			console.log(results)
			res.render('rss', results)
		}
	})
}

module.exports = renderRSS
