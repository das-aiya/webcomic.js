var async = require('async')
var fs = require('fs')
var path = require('path')
var defaults = require('./defaults.js')

var mainDir = path.dirname(process.mainModule.filename)

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
					data.selected = files[i]		
					callback(null, data)
					found = true
				} 
			}
			if (!found) {
				data.selected = null
				callback(null, data)
			}
		}
	],
	function(err, result) {
			callback__(err, result)
	})
}

module.exports = Useful
