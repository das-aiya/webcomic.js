var async = require('async')
var fs = require('fs')
var path = require('path')

module.exports = {
	fileGrep : function (data, callback__) {
		async.waterfall([
			function (callback) {
				fs.readdir(data.pathName, function(err, files) {
					data.files = files
					callback(null, data)
				})
			},

			function (data, callback) {
				var files = data.files
				var pathName = data.pathName
				var query = data.query
				var found = false

				for( var i = 0; i < files.length; i++ ) {

					var basename = path.basename( files[i], path.extname(files[i]))

					if( basename == query ) {
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
				callback__(result)
		})
	}
}
