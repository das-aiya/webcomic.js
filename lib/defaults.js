var path = require('path')
var mainDir = path.dirname(process.mainModule.filename)

var Defaults = {
	pageDirName: "/pages/",
	pageAccessURL: '/p/',
	dataDirName: "/data/"
}

Defaults.dataPath = path.join(mainDir, Defaults.dataDirName)

Defaults.privatePagesPath = path.join('public', Defaults.pageDirName) 

Defaults.privateThumbDir = 'thumb'

module.exports = Defaults
