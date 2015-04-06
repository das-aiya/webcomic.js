# webcomic.js
Webcomic.js is an newborn, alpha-stage content management system for publishing comics online.  It currently provides a half-finished api for clean access, and also responds to manual uploads of numbered files to specific folders, i.e., putting 1.jpg into the pages folder will cause this page to appear on the site.

This is not just a framework; the next stage of development for webcomic.js will involve the creation of a browser-based frontend for easy point-and-click content management.

## Installing

Clone from Github, then run.

	git clone https://github.com/das-aiya/webcomic.js
	cd webcomic.js
	npm install
	npm start

You might have to install some extra dependencies, but those aren't documented, yet.

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
- create a frontend for adding/deleting/rearranging/describing comic pages

Webcomic.js is currently under early-stage, pre-alpha development.  While theoretically functional for production use, it's not to be considered fully realized or feature-complete.  So hold your horses, okay?
