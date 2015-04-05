# webcomic.js
Webcomic.js is an early pre-alpha stage content management system for publishing comics online.  It currently provides a half-finished api for clean access, and also responds to manual uploads of numbered files to specific folders, i.e., putting 1.jpg into the pages folder will cause this page to appear on the site.

This is not just a framework; the next stage of development for webcomic.js will involve the creation of a browser-based frontend for easy point-and-click content management.

## Installing

Clone from Github, then install dependencies, then run:

	git clone https://github.com/das-aiya/webcomic.js
	cd webcomic.js
	npm install
	npm start

## Pages
There are some sample images in the public/pages folder, with names like 1.png and 5.jpg.  Adding similarly, logically numbered images will automatically make them available on your website!

## Page Descriptions and Metadata
Page descriptions are pretty easy.  They're stored in .md files in the data folder.  This means that you can write your page description as plain text, or you can use the features of Markdown, or you can write it in pure HTML.  The plan is to create a frontend that lets you use a WYSIWYG editor to do all of this from the browser, if desired.

Page metadata is currently stored in .yaml files in the "data" folder.  Here's an example:

	name: So it begins.
	date: 23-March-2015
	tags: 
	 - office
	 - wednesday
	 - elliot
	 - jason

## API
If you like to use the command line, I'm with you all the way!  If you like to program in Javascript, and get JSON responses from HTTP requests, well, I also like you.  In fact, I coded this API specifically for useage in a browser front-end to the webapp, but you can call it manually, too.

All API requests, unless otherwise specified, will return a JSON string with two attributes:
- a 'result' containing either 'success' or 'failure'.
- if the request is successfull, the 'msg' will either contain the stuff you asked for, or a cute little string congratulating you on your successful API call.  I couldn't help myself, because I have a soft spot for cute little strings.  Failure will return an error message.

All POST requests must be sent forms containing content labelled "content," unless otherwise specified.

# POST /api/postPage
Puts a page that fits after the last posted page.  So if you had five pages up, and you send this method an image file, a sixth page will be available at http://www.yourwebsite.com/p/6.  This method must be sent a file.

# POST /api/postDesc
Send either a file or plaintext form data.  This assigns a markdown file to your last posted page, so your page can have a description!  If there's an existing description, it will be overwritten.

# POST /api/postData
Send either a file or plaintext form data.  This assigns a data file to your last posted page, so your page can have tags and a title and stuff!

# POST /api/modPage/[number]
Replaces page [number] with your new page. This method must be sent a file.

# POST /api/modDesc/[number]
Replaces page [number]'s Markdown description with the form text or file you send.

# POST /api/modData/[number]
Replaces page [number]'s YAML data with the form text or file you send.

# GET /api/getDesc/[number]
Returns the page description at data/[number].md.  Returns an error if the description file can't be found.

# GET /api/getData/[number]
Returns the page metadata at data/[number].yaml.  Returns an error if the description file can't be found.

# GET /api/getPage/[number]
Returns the page buffer as a JSON string.  This is actually a pretty bad idea.  Don't do this.

# Getting Raw Instead of JSON
Page, Data, and Desc GET methods can be renamed to include "Raw" in them, so you can retrieve raw data instead of a JSON string.  This means that a GET request at /api/getPageRaw/3 will give you the actual image file that's saved for that page.

http://mycomic.awesome.com/api/

### An Example with cURL
swaglicious@foobox $ alias curl='curl -b cookiefile.txt -d cookiefile.txt'
swaglicious@foobox $ curl -F "username=dan" -F "password=you'llneverguess"
{
  "result": "success",
	"msg": "You are now logged in."
}

curl -F "content=@mynewpage.jpg" 
{
  "result": "success",
  "msg": "A dispute among employees.  We made it to page two!  This is a milestone.\n"
}

Here's the current todo list for more features:

- finish the upload/download/modify api
- create a frontend for adding/deleting/rearranging/describing comic pages

Webcomic.js is currently under early-stage, pre-alpha development.  While theoretically functional for production use, it's not to be considered fully realized or feature-complete.  So hold your horses, okay?
