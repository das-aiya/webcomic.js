# webcomic.js
Webcomic.js is a newborn, alpha-stage content management system for publishing comics online.  Which is to say it's a program that sends webcomic pages to a web browser!  This page is primarily for web developers who are interested in testing/using Webcomic.js.  There currently is no point-and-click easy installer, partly because webcomic.js is so new.

If you're not into that, that's okay!  Feel free to read through the documentation if you're the curious sort, or [go back to the comic](http://nebula-ice.erki.net/).

Webcomic.js runs on Node.js Express, with dependencies including GraphicsMagick and Multer.  It currently provides a half-finished api for clean access, and will respond to manual uploads of numbered files to specific folders, i.e., putting 1.jpg into the pages folder will cause this page to appear on the site.

This is not just a framework; the next stage of development for webcomic.js will involve the creation of a browser-based frontend for easy point-and-click content management.

## Installing
Clone from Github, then run.

	git clone https://github.com/das-aiya/webcomic.js
	cd webcomic.js
	npm install
	npm start

You might have to install some extra dependencies, but those aren't documented, yet, except that you definitely need GraphicsMagick, which is used for thumbnail generation.

You'll also want to make a thumbnail directory:
	
	mkdir thumb

as well as a pages directory in the public folder:
	
	mkdir public/pages

You can edit where Webcomic.js will look for these in lib/defaults.js.  A lot of other settings are in package.json, so be sure to check those out.

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
Webcomic.js's developer API is documented [here](./docs/API.md).

## TODO
Here's the current todo list for more features:

- add more upload/download/modify features
- complete a working frontend for adding/deleting/rearranging/describing comic pages

Webcomic.js is currently under early-stage, pre-alpha development.  While theoretically functional for production use, it's not to be considered fully realized or feature-complete.  So hold your horses, okay?
