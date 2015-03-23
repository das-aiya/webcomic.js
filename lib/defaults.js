var path = require('path')

var Defaults = {
	pageDirName: "/pages/",
	pageAccessURL: '/page/'
}

Defaults.privatePagesPath = path.join('public', Defaults.pageDirName) 

module.exports = Defaults
