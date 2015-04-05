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
		res.sendFailure("You have to be logged in to use this feature.")
	}
}

router.all('*', function(req, res, next) {
	res.locals.sendPretty = function(msg) {
		msg = JSON.stringify(msg, null, 2)
		res.send(msg)
	}

	res.locals.sendSuccess = function(msg) {
		res.locals.sendPretty({
			result: 'success',
			msg: msg
		})
	}

	res.locals.sendFailure = function(msg) {
		res.locals.sendPretty({
			result: 'failure',
			msg: msg
		})
	}

	res.locals.delegate = function(err, result) {
		if (err) {
			res.locals.sendFailure(err)
		} else {
			res.locals.sendSuccess(result)
		}
	}

	next()
})

router.post("/login", function(req, res, next) {
	if(
		req.body.username === config.username
		&& req.body.password === config.password
	) {
		req.session.auth = true
		if (req.body.redirect) {
			res.redirect(req.body.redirect)
		} else {
			res.locals.sendSuccess("You are now logged in.")
		}
	} else {
		res.locals.sendFailure(
			"Your username or password was found to be incorrect.  Please try again."
		)
	}
})

// router.use("/*", auth)

router.use("/logout", function(req, res, next) {
	req.session = null
	res.locals.sendSuccess("You have been successfully logged out.")
})

router.get("/getPageCount", function(req, res) {
	useful.lastPage(function (err, results) {
		if (err) {
			res.sendFailure(err)
		} else {
			var num = parseInt(results)
			res.locals.sendSuccess(num)
		}
	})
})

// figure out the private directory and extname of the API request
router.all(new RegExp("(Page|Desc|Data)"), function (req, res, next) {
	var extNames = {
		"Page": 'given',
		"Desc": "md",
		"Data": "yaml"
	}

	var property = req.params[0]

	res.locals.target = property

	if (res.locals.target == "Page") {
		res.locals.destDir = defaults.privatePagesPath
		// the extname for a Page has to wait until
		// after we determine the action we're going
		// to take on the page

	} else {
		res.locals.ext = extNames[property]
		res.locals.destDir = defaults.dataPath
	}

	next()
})

// determine whether we need to read or write a file
// make sure our writable content is in req.body.content
// if we're posting something, the target file basename
// can be determined from the number of the last page.
// pick the function we'll use to read/write the file.
router.all(new RegExp("(mod|post|get)"), function (req, res, next) {

	// here are all the functions that are executed at the
	// end of figuring out what to do.

	// write the file given by the request
	var writeReqFile = function (destDir, num, ext) {
		var pathName = path.join(destDir, num + "." + ext)

		fs.writeFile(pathName, req.body.content, function (err) {
			if (err) {
				res.locals.sendFailure("Your file could not be written for some reason.")
			} else {
				res.locals.sendSuccess("You did it.  Congratulations!")
			}
		})
	}

	// read the file given by the request
	var readReqFile = function (destDir, num, ext) {
		var pathName = path.join(destDir, num + "." + ext)
		var param = 'utf-8'

		if (res.locals.target == "Page") {
			param = null
		}

		fs.readFile(pathName, param, function (err, result) {
			if (!res.locals.raw) {
				console.log("hella")
				if (err) {
					res.locals.sendFailure("The file could not be read for some reason!")
				} else {
					res.locals.sendSuccess(result)
				}
			} else {
				if (err) {
					res.status(404).send("Not found.")
				} else {
					res.send(result)
				}
			}
		})
	}

	// determine the name of the file, from a
	// page number. open it and send the results
	var grepReadReqPage = function (destDir, num, ext) {
		console.log(destDir)
		console.log(num)

		useful.fileGrep({
			pathName: destDir,
			query: res.locals.num
		},
		function (err, results) {
			if (!results.selected) {
				res.locals.sendFailure("We couldn't find that page!  Sorry, bro.")
			} else {
				fs.readFile(path.join(destDir, results.selected), function(err, results) {
					res.locals.delegate(err, results)
				})
			}
		})
	}

	// determine the name of the file, from a 
	// page number.  delete it, and write
	// the new file.
	var grepWriteReqPage = function (destDir, num, ext) {
		useful.fileGrep({
			pathName: destDir,
			query: res.locals.num
		},
		function (err, results) {
			if (!results.found) {
				res.locals.sendError("We couldn't find that page!  Sorry, bro.")
			} else {
				fs.unlink(results.selected, function(err) {
					if (err) {
						res.delegate(err)
					} else {
						writeReqFile(
							destDir, num, ext
						)
					}
				})
			}
		})
	}

	var property = req.params[0]
	var methodNames = {
		"mod": writeReqFile,
		"post": writeReqFile,
		"get": readReqFile
	}

	res.locals.method = property
	res.locals.fsMethod = methodNames[property]

	// some of this logic is a little tangly.  Sorry about
	// that!  I'll re-work it when I get the chance.
	if (res.locals.target == "Page") {
		if (res.locals.method == "get") {
			// we won't be passing an extname
			// to the final function if we're getting
			// a page
			res.locals.fsMethod = grepReadReqPage
			res.locals.ext = ""
		} else {
			res.locals.ext = req.files.content[0].extension
			res.locals.fsMethod = grepWriteReqPage
		}
	} 


	var proceed = function(err, result) {
		result = parseInt(result)

		if (err) {
			res.delegate(err, null)
		} else {
			if (res.locals.target == "Page") {
				result = result + 1
			}

			res.locals.num = result
			next()
		}
	}

	if (res.locals.method != "get") {
		if (req.files.content) {
			req.body.content = req.files.content[0].buffer
		}
		useful.lastPage(proceed)
	} else {
		proceed(null, null)
	}
})


router.all("/*/*", function(req, res, next) {

	console.log(req.originalUrl)

	if (res.locals.method != "post") {
		if (req.params[1]) {
			res.locals.num = parseInt(req.params[1])
		} else {
			res.locals.sendFailure("You have to include a page number with your request!")
			return
		}
	}

	next()
})

router.all(new RegExp(".*Raw.*"), function(req, res, next) {
	console.log('raw found.')
	res.locals.raw = true

	next()
})

router.all("*", function(req, res) {

	var targetFile = path.join(
		res.locals.destDir, res.locals.num + res.locals.ext
	)

	console.log("executing an fs method")

	res.locals.fsMethod(
		res.locals.destDir,
		res.locals.num,
		res.locals.ext
	)
})

router.get("/getPagePath/*", function(req, res) {
	var descNumber = req.params[0]

	if (descNumber == null) {
		res.sendFailure("You need to specify a page number.")
	} else {
		useful.fileGrep({
			pathName: defaults.privatePagesPath,
			query: descNumber
		}, function (err, results) {
			if (err || !results.selected) {
				res.locals.sendFailure("There was a problem retrieving the specified page.") 
			} else {
				res.locals.sendSuccess( 
					path.join(defaults.pageDirName, results.selected)
				)
			}
		})
	}
})


module.exports = router
