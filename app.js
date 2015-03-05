var express = require('express')
var http = require('http')
var path = require('path')
var fs = require("fs")
var async = require('async')
var fileGrep = require('./lib/fileGrep.js').fileGrep

var app  = express()

app.set('appName', 'hello-world')
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views') )
app.set('view engine', 'jade')

app.use(express.static(path.join(__dirname, 'public')));
// app.use( bodyParser.json() )

var pageDirName = "/pages/" 
var pageAccessURL = '/page/'
var privatePagesPath = path.join(__dirname, 'public', pageDirName) 

// redirect to the last page
app.get('/', function(req, res) {

	// http://stackoverflow.com/a/15804736
	// thanks Stackoverflow user pfried
	var numSort = function (a, b) {
		var a = parseInt(a)	
		var b = parseInt(b)	

		return a - b
	}

	fs.readdir(privatePagesPath, function(err, files) {

		files.sort(numSort)
		pageFile = files[files.length - 1]
		pageNum = path.basename(pageFile, path.extname(pageFile))

		res.redirect(pageAccessURL + pageNum)
	})
})

// return the page at /p/NUMBER
app.get(pageAccessURL + '*', function(req, res) {

	var number = req.params[0]
	var intNumber = parseInt( number )

	function returnComicPage (pagesData, mdData) {

		files = pagesData.files

		if( files.length - 1 == intNumber ) { isLast = true } 
		else { isLast = false }

		if ( intNumber > 0 ) { previous = intNumber - 1 } 
		else { previous = "#" }

		if ( isLast ) { next = "#" }
		else { next = intNumber + 1 }

		var data = {
			previous  : previous,
			next      : next,
			pageSource: "/pages/" + pagesData.selected
		}

		if( mdData.selected != null ) {
			data.desc = mdData.result
		} else {
			data.desc = " "
		}

		publicPath = path.join(__dirname, "public")
		pagePath = path.join(publicPath, data.pageSource)

		res.render("index", data)
	}


	async.parallel(
		[
			function (callback) {
				fileGrep({
					pathName: privatePagesPath,
					query   : number
				},
				function (results) {
					callback(null, results)
				})
			},
			function (callback) {
				fileGrep({
					pathName: path.join(__dirname, 'data/desc'),
					query   : number
				},
				function (results) {
					if (results.selected != null) {
						myPath = path.join(results.pathName, results.selected)
						fs.readFile(myPath, 'utf8', function (err, result) {
							results.result = result
							callback(null, results)
						})
					} else {
						callback(null, results)
					}
				})
			}
		],
		function (err, results) {
			returnComicPage(results[0], results[1])
		}
	)


})

app.get("*.html", function(req, res) {
	var name = req.params[0]
	
	renderName = path.basename(name, path.extname(name))

	res.render(renderName)

})

app.post("/api/postPage", function(req, res) {
})

app.post("/api/postDesc", function(req, res) {
})

app.post("/api/modDesc", function(req, res) {
})

app.post("/api/modPage", function(req, res) {
})

app.get("/api/getDesc", function(req, res) {
})

app.get("/api/getPage", function(req, res) {
})

app.use("*", function(req, res) {
	res.render('pageNotFound')
})

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server fuckin\' listenin\' on port ' 
		+ app.get('port'));
});
