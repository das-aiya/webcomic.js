# webcomic.js

Webcomic.js is an early pre-alpha stage content management system for publishing comics online.  It currently provides a half-finished api for clean access, and also responds to manual uploads of numbered files to specific folders, i.e., putting 1.jpg into the pages folder will cause this page to appear on the site.

## Installing

Clone from Github, then install dependencies, then run:

	git clone https://github.com/das-aiya/webcomic.js
	cd webcomic.js
	npm install
	npm start

## Adding Pages
There are some sample images in the public/pages folder, with names like 1.png and 5.jpg.  Adding similarly, logically numbered images will automatically make them available on your website!

## Adding Page Descriptions
Just create a new markdown (.md) file in data!  It works in a manner anologous to pages.

## Adding additional page metadata
Page metadata is currently stored in .yaml files in the "data" folder.
`
name: So it begins.
date: 23-March-2015
tags: 
 - office
 - wednesday
 - elliot
 - jason

`

## Is that it?

Here's the current todo list for more features:

- add page description with markdown support
- add an upload/download/modify api
- re-release as a Node.js module!
- create a frontend for adding/deleting/rearranging/describing comic pages

Webcomic.js is currently under early-stage, pre-alpha development.  While theoretically functional for production use, it's not to be considered fully realized or feature-complete.  So hold your horses, okay?
