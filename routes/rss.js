var useful = require('../lib/useful.js')
var defaults = require('../lib/defaults.js')
var path = require('path')
var fs = require('fs')
var async = require('async')
var mainDir = path.dirname(process.mainModule.filename)

// this is kind of a mess, and I apologize.
// like, why are we iterating over the array
// twenty times?
var dataLookupHelper = function(dirPath, name, dirArray) {
	var myPath = path.join(dirPath, name)
	var found = false
	for (var i = 0; i < dirArray.length; i++) {
		if( name == dirArray[i] ) {
			found = true
			break
		}
	}

	if (found) {
		console.log('found path; assigning ' + myPath)
		var result = function (callback) {
			fs.readFile(this.path, {encoding: 'utf-8'},function (err, results) {
				if(err) {
					callback(err, null)
				} else {
					console.log(results)
					callback(null, results)
				}
			})
		}
		result.path = myPath
		return result.bind(result)
	} else {
		return function (callback) {
			callback(null, null)
		}
	}
}

renderRSS = function (req, res, next) {
	var dataPath = path.join(mainDir, "data")
	var pagePath = path.join(mainDir, defaults.privatePagesPath)
	async.parallel([
		function (callback) {
			fs.readdir(pagePath, function(err, results) {
				if (err) {
					console.log(err)
					callback(err)
				} else {
					callback(null, results)
				}
			})
		},
		function (callback) {
			fs.readdir(defaults.dataPath
			, function (err, results) {
				if (err) {
					console.log(err)
					callback(err)
				} else {
					callback(null, results)
				}
			})
		}
	], function (err, results) {
		var pageArray = results[0]
		var dataArray = results[1]
		var parallelFunctions = []

		for(var i = 0; i < pageArray.length; i++) {
			var mdName = i + ".md"
			var ymlName = i + ".yaml"
			var mdFunc = dataLookupHelper(dataPath, mdName, dataArray)
			var ymlFunc = dataLookupHelper(dataPath, ymlName, dataArray)
			console.log(mdName)
			console.log(mdFunc.path)

			parallelFunctions[i] = function (callback) {
				async.parallel([ mdFunc, ymlFunc ],
				function (err, results) {
					if (err) {
						callback(err)
					} else {
						callback(null, results)
					}
				})
			}
		}

		async.parallel(parallelFunctions, function (err, results) {
			if (err) {
				console.log(err)
				res.send("failed.")
			} else {
				console.log('parallel lookup complete')
				console.log(results)
				res.send("made it.")
			}
		})
	})
}

module.exports = renderRSS
