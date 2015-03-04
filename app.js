var express = require('express')
var http = require('http')
var path = require('path')
var fs = require("fs")
var async = require('async')

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

	async.waterfall([
		// i.  read filesystem
		function ( callback ) {
			fs.readdir(privatePagesPath, function(err, files) {
				callback(null, files)
			})
		},

		// ii. check for appropriate file
		function (files, callback) {

			var pageSource = null

			for( var i = 0; i < files.length; i++ ) {
				var basename = path.basename( files[i], path.extname(files[i]))

				if( basename == number ) {
					pageSource = pageDirName + files[i]		
					break
				} 
			}

			if (pageSource != null) {
				callback( null, files, pageSource )
			} else {
				// throw error if page not found
				callback("The requested comic page could not be located.")	
			}
		},

		// iii.  render page from template.
		function (files, pageSource, callback) {
			console.log(files.length)
			console.log(intNumber)
			if( files.length - 2 == intNumber ) { isLast = true } 
			else { isLast = false }

			if ( intNumber > 0 ) { previous = intNumber - 1 } 
			else { previous = "#" }

			if ( isLast ) { next = "#" }
			else { next = intNumber + 1 }

			var data = {
				previous  : previous,
				next      : next,
				pageSource: pageSource
			}

			publicPath = path.join(__dirname, "public")
			pagePath = path.join(publicPath, pageSource)

			res.render("index", data)
			callback(null, "Page successfully rendered!")
		}
	],

	function(err, status) {
			data = {
				message : err
			}

			res.render('pageNotFound', data)
	})

})

app.get("*.html", function(req, res) {
	var name = req.params[0]
	
	renderName = path.basename(name, path.extname(name))

	res.render(renderName)

})

app.use("*", function(req, res) {
	res.render('pageNotFound')
})

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server fuckin\' listenin\' on port ' 
		+ app.get('port'));
});
