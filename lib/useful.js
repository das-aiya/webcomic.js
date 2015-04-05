var async = require('async')
var fs = require('fs')
var path = require('path')
var defaults = require('./defaults.js')
var moment = require("moment")
var marked = require('marked')
var yaml = require('js-yaml')

var mainDir = path.dirname(process.mainModule.filename)
var dataPath = path.join(mainDir, "data")
var pagePath = path.join(mainDir, defaults.privatePagesPath)


var Useful = {}

Useful.numSort = function() {
	// http://stackoverflow.com/a/15804736
	// thanks Stackoverflow user pfried
	var a = parseInt(a)	
	var b = parseInt(b)	

	return a - b
}

// return the basename of the last page
// in the public pages directory
Useful.lastPage = function(callback) {
	var privatePagesPath = path.join(mainDir, defaults.privatePagesPath)

	fs.readdir(privatePagesPath, function(err, files) { 
		if (err) {
			callback(err)
		} else {
			files.sort(Useful.numSort)
			var pageFile = files[files.length - 1]
			var pageNum = path.basename(pageFile, path.extname(pageFile))
			callback(null, pageNum)
		}
	})
}

// takes { pathName: . . ., query: . . . }
// searches folder given by pathName
// for fileName containing query
// returns a matching fileName
Useful.fileGrep = function(data, callback__) {
		async.waterfall([
			function (callback) {
			fs.readdir(data.pathName, function(err, files) {
				if (err) {
					console.log(err)
				} else {
					data.files = files
					callback(null, data)
				}
			})
		},
		function (data, callback) {
			var files = data.files
			var pathName = data.pathName
			var query = data.query
			var found = false

			for( var i = 0; i < files.length; i++ ) {

				var basename = path.basename(files[i])

				if( basename.match(query) ) {
					found = true
					data.selected = files[i]		
					break
				} 
			}
			callback(null, data)
		}
	],
	function(err, result) {
			callback__(err, result)
	})
}

Useful.fileGrepOpen = function(data, callback__) {
}

Useful.dataLookupHelper = function (fileName) {
	var fileName = path.join(dataPath, fileName)

	return function (callback) {

		console.log(fileName)
		fs.readFile(fileName
		, { encoding: 'utf-8' }, function (err, result) {
			callback(err, result)
		})

	}.bind(this)
}

Useful.dataGet = function (fileName, callback) {
	var basename = path.basename(fileName, path.extname(fileName))

	async.parallel([
		Useful.dataLookupHelper(basename + '.md'),
		Useful.dataLookupHelper(basename + '.yaml')
	], function (err, results) {
		callback(err, results)
	})
}

Useful.dataRead = function (fileName, callback) {
	Useful.dataLookupHelper(fileName)(callback)
}

Useful.buildUpdates = function (limit, callback) {
	fs.readdir(defaults.privatePagesPath, function (err, fileArray) {
		if (err) {
			callback(err)
		} else {
			async.map(fileArray, Useful.dataGet, function (err, results) {
				if (err) {
					callback(err)
				} else {
					var finalResults = []
					for (var i = 0; i < results.length; i++) {
						var r = yaml.safeLoad(results[i][1])

						r.desc = marked(results[i][0]),
						r.fileName = fileArray[i]
						r.link = defaults.pageAccessURL + (i + 1)
						r.src = path.join(
							defaults.pageDirName + r.fileName
						)
						
						finalResults[i] = r
					}
					callback(null, { updates: finalResults })
				}
			})
		}
	})
}

module.exports = Useful
