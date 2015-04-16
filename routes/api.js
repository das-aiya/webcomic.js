var express = require('express')
var useful = require('../lib/useful.js')
var fs = require('fs')
var config = require('../package')
var router = express.Router()
var defaults = require('../lib/defaults.js')
var path = require('path')

var genericSuccess = {
	result: "success"
}

var auth = function(req, res, next) {
	if (req.session.auth) {
		console.log("authorized.")
		return next()
	} else {
		res.send({
			result: "failure",
			msg: "You have to be logged in to use this feature."
		})
	}
}

router.post("/login", function(req, res, next) {
	console.log(req.body)
	if(
		req.body.username === config.username
		&& req.body.password === config.password
	) {
		req.session.auth = true
		if (req.body.redirect) {
			res.redirect(req.body.redirect)
		} else {
			res.send(genericSuccess)
		}
	} else {
		res.send({
			result: "failure",
			msg: "Your username or password was found to be incorrect.  Please try again."
		})
	}
})

router.use("/*", auth)

router.use("/logout", function(req, res, next) {
	req.session = null
	res.send({
		result: "success",
		msg: "You have been successfully logged out."
	})
})

router.post("/postPage", function(req, res) {
	var file = req.files.file[0]
	var destDir = defaults.privatePagesPath

	function moveFile (err, lastPage) {
		if (err) {
			console.log(err)
		} else {
			pageNum = parseInt(lastPage)
			pageNum = pageNum + 1
			pageName = pageNum + path.extname(file.path)
			fs.rename(file.path, pageName)
			if (req.body.redirect) {
				res.redirect(req.body.redirect)
			} else {
				res.send({
					result: "success",
					msg: "Your page has been successfully posted."
				})
			}
		}
	}
	useful.lastPage(moveFile)
})

router.post("/postDesc", function(req, res) {
})

router.post("/modDesc/*", function(req, res) {
	
})

router.post("/modPage/*", function(req, res) {
	var files = req.files.file
	var pageNumber = parseInt(req.params[0])
	var destDir = defaults.privatePagesPath

	for(var i = 0; i < files.length; i++) {
		var oldPath = files[i].path
		var extName = path.extname(oldPath)
		var baseName = pageNumber + i
		var newPath = destDir + baseName + extName

		fs.rename(oldPath, newPath) // no error handling yet
	}
})

router.get("/getDesc/*", function(req, res) {
	var descNumber = req.params[0]

	if (descNumber == null) {
		res.send({
			result: "failure",
			msg: "You need to specify a page number."
		})
	} else {
		
	}
})

router.get("/getPage/*", function(req, res) {
	var descNumber = req.params[0]

	if (descNumber == null) {
		res.send({
			result: "failure",
			msg: "You need to specify a page number."
		})
	} else {
		useful.fileGrep({
			pathName: defaults.privatePagesPath,
			query: descNumber
		}, function (err, results) {
			if (err || !results.selected) {
				res.send({
					result: "failure",
					msg: "There was a problem retrieving the specified page."
				})
			} else {
				res.send({
					result: "success",
					msg: path.join(defaults.pageDirName, results.selected)
				})
			}
		})
	}
})

router.get("/getPageCount", function(req, res) {
	useful.lastPage(function (err, results) {
		if (err) {
			// handle error here
		} else {
			num = parseInt(results)
			res.send({
				result: "success",
				data: num
			})
		}
	})
})

module.exports = router
