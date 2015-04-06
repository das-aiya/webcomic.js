# API
If you like to use the command line, I'm with you all the way!  If you like to program in Javascript, and get JSON responses from HTTP requests, well, I also like you.  In fact, I coded this API specifically for usage in a browser front-end to the webapp, but you can call it manually, too.

All API requests, unless otherwise specified, will return a JSON string with two attributes:
- a 'result' containing either 'success' or 'failure'.
- if the request is successfull, a 'msg' will either contain the stuff you asked for, or a cute little string congratulating you on your successful API call.  I couldn't help myself, because I have a soft spot for cute little strings.  Failure will return an error message.

All POST requests must be sent forms containing content labelled "content," unless otherwise specified.

## Logging in And Out
### POST /api/login
Send a username and a password!  It's classic.  You'll get confirmation that you logged in and a session cookie if successful, a failure notice if not.

### GET /api/logout
This will erase your session with the server.  Alternatively, you can just delete your cookies.

## Posting Updates and New Content
### POST /api/postPage
Puts a page that fits after the last posted page.  So if you had five pages up, and you send this method an image file, a sixth page will be available at http://www.yourwebsite.com/p/6.  This method must be sent a file.

### POST /api/postDesc
Send either a file or plaintext form data.  This assigns a markdown file to your last posted page, so your page can have a description!  If there's an existing description, it will be overwritten.

### POST /api/postData
Send either a file or plaintext form data.  This assigns a data file to your last posted page, so your page can have tags and a title and stuff!

## Modifying Existing Content
### POST /api/modPage/[number]
Replaces page [number] with your new page. This method must be sent a file.

### POST /api/modDesc/[number]
Replaces page [number]'s Markdown description with the form text or file you send.

### POST /api/modData/[number]
Replaces page [number]'s YAML data with the form text or file you send.

## Requesting Existing Content
### GET /api/getDesc/[number]
Returns the page description at data/[number].md.  Returns an error if the description file can't be found.

### GET /api/getData/[number]
Returns the page metadata at data/[number].yaml.  Returns an error if the description file can't be found.

### GET /api/getPage/[number]
Returns the page buffer as a JSON string.  This is actually a pretty bad idea.  Don't do this.

### Getting Raw Instead of JSON
Page, Data, and Desc GET methods can be renamed to include "Raw" in them, so you can retrieve raw data instead of a JSON string.  This means that a GET request at /api/getPageRaw/3 will give you the actual image file that's saved for that page.

## Requesting Information About Site Content
To be added!

## An Example with cURL
	swaglicious@foobox $ alias curl='curl -b cookiefile.txt -d cookiefile.txt'
	swaglicious@foobox $ mysite="http://mycomic.awesome.com/api"
	swaglicious@foobox $ curl -F "username=dan" -F "password=you'llneverguess" "$mysite/login"
	{
		"result": "success",
		"msg": "You are now logged in."
	}
	swaglicious@foobox $ curl -F "content=@mynewpage.jpg" "$mysite/postPage"
	{
		"result": "success",
		"msg": "Your file has been successfully uploaded!"
	}
	swaglicious@foobox $ curl "$mysite/getDesc/3"
	{
		"result": "success",
		"msg": "Hey!  Welcome to page three.  God, it took forever to get the shading on Lisa's upper lip right.  Super duper forever.\nAnyway, I hope you like it.  Feel free to leave a comment.  I love comments!"
	}
	swaglicious@foobox $ curl -F "content=This page is inredibly silly in retrospect." "$mysite/modDesc/3"
	{
	  "result": "success",
		"msg": "The file was successfully written!"
	}
	swaglicious@foobox $ rm cookiefile.txt
	swaglicious@foobox $ exit
