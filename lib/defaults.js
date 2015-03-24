var path = require('path')
var mainDir = path.dirname(process.mainModule.filename)

var Defaults = {
	pageDirName: "/pages/",
	pageAccessURL: '/page/',
	dataDirName: "/data/"
}

Defaults.dataPath = path.join(mainDir, Defaults.dataDirName)

Defaults.privatePagesPath = path.join('public', Defaults.pageDirName) 

module.exports = Defaults
