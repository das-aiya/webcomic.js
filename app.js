var async = require('async')
var bodyParser = require('body-parser')
var config = require('./package')
var cookieParser = require('cookie-parser')
var express = require('express')
var http = require('http')
var multer = require('multer')
var path = require('path')
var session = require('express-session')

var defaults = require('./lib/defaults.js')
var useful = require('./lib/useful.js')
var main = require('./routes/main.js')
var rss = require('./routes/rss.js')
var api = require('./routes/api.js')

var app  = express()

app.set('appName', 'comicpublisher.js')
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views') )
app.set('view engine', 'jade')
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.cookieSession())
// app.use( bodyParser.json() )
app.use(multer({
	dest: './uploads/',
	onFileUploadStart: function (file) {
		console.log(file.originalname + ' is downloading.')
	},
	onFileUploadComplete: function (file) {
	},
	putSingleFilesInArray: true
}))


app.use(bodyParser())
app.use(cookieParser('FzAmMi93z_bA2LpCxgRLsa3qg95OLtrO'))
app.use(session({'secret':'5ozY2vfr5vEHYz_avJ?z69HnVQUxh2bw'}))
app.use('/api', api)

app.get('/', function(req, res) {
	useful.lastPage(function(err, result) {
		res.redirect(defaults.pageAccessURL + result)
	})
})

app.use("*rss*", rss)

// return the page at /page/NUMBER
app.get(defaults.pageAccessURL + '*', main)

app.get("*.html", function(req, res) {
	var name = req.params[0]
	renderName = path.basename(name, path.extname(name))
	res.render(renderName)
})

app.get("*", function(req, res) {
	res.render('pageNotFound')
})

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listenin\' on port ' 
		+ app.get('port'));
});
