var defaults = require('../lib/defaults.js')
var async = require('async')
var fs = require('fs')
var path = require('path')
var useful = require('../lib/useful.js')
var yaml = require('js-yaml')
var marked = require('marked')

var pageDirName = defaults.pageDirName
var pageAccessURL = defaults.pageAccessURL
var privatePagesPath = defaults.privatePagesPath
var mainDir = path.dirname(process.mainModule.filename)

// this is where all the action is
// this is where we put on the show
var Main = function(req, res) {

	var number = req.params[0]
	var intNumber = parseInt( number )

	function returnComicPage (pagesData, mdData, yamlData) {

		var files = pagesData.files

		var isLast, previous, next, isFirst;

		if( intNumber == 1 ) { isFirst = true } 
		else { isFirst = false }

		if( files.length == intNumber ) { isLast = true } 
		else { isLast = false }

		if ( intNumber > 0 ) { previous = intNumber - 1 } 
		else { previous = "#" }

		if ( isLast ) { next = "#" }
		else { next = intNumber + 1 }

		var data = {
			previous  : previous,
			next      : next,
			pageSource: "/pages/" + pagesData.selected,
			isFirst: isFirst,
			isLast: isLast
		}

		if( mdData.selected != null ) {
			data.desc = mdData.result
			data.md = marked
		} else {
			data.desc = " "
			data.md = function(data) {
				return data
			}
		}

		if( yamlData.selected ) {
			var yamlData = yamlData.result
			data.title = yamlData.name
			data.date = yamlData.date
			data.tags = yamlData.tags
		} else {
			data.title = path.basename(data.pageSource)
		}

		var publicPath = path.join(__dirname, "public")
		var pagePath = path.join(publicPath, data.pageSource)

		res.render("index", data)
	}

	async.parallel(
		[
			function (callback) {
				useful.fileGrep({
					pathName: privatePagesPath,
					query   : new RegExp(".*" + number + "\." + "*")
				},
				function (err, results) {
					callback(null, results)
				})
			},
			function (callback) {
				useful.fileGrep({
					pathName: path.join(mainDir, 'data'),
					query   : new RegExp(".*" + number + "\.md")
				},
				function (err, results) {
					if (results.selected != null) {
						var myPath = path.join(results.pathName, results.selected)
						fs.readFile(myPath, 'utf8', function (err, result) {
							results.result = result
							callback(null, results)
						})
					} else {
						callback(null, results)
					}
				})
			},
			// yeah, i know!  redundant information.
			// perhaps we'll fix this later.
			function (callback) {
				useful.fileGrep({
					pathName: path.join(mainDir, 'data'),
					query   : new RegExp(".*" + number + "\.yaml")
				},
				function (err, results) {
					if (results.selected != null) {
						myPath = path.join(results.pathName, results.selected)
						fs.readFile(myPath, 'utf8', function (err, result) {
							try {
								results.result = yaml.safeLoad(result)
							} catch (error) {
								console.log(error)
							}
							callback(null, results)
						})
					} else {
						callback(null, results)
					}
				})
			}
		],
		function (err, results) {
			returnComicPage(results[0], results[1], results[2])
		}
	)
}

module.exports = Main
