# webcomic.js

Webcomic.js is an open-source framework to help you publish webcomics online using state-of-the-art web technology, hopefully soon to grow into a full-fledged webapp you can interact with using an online interface!  It's way under construction right now.

## Installing

Until this is re-released as a node module, it has to be cloned from Github:

	git clone https://github.com/das-aiya/webcomic.js
	cd webcomic.js
	npm install
	npm start

## Adding Pages
There are some sample images in the public/pages folder, with names like 1.png and 5.jpg.  Adding similarly numbered images will automatically add them to your website!

## Adding Page Descriptions
Just create a new markdown file in data/desc!  It works in a manner anologous to pages.  Only... markdown support isn't implemented yet.  Oops!

## Is that it?

Here's the current todo list for more features:

- add page description with markdown support
- add an upload/download/modify api
- re-release as a Node.js module!
- create a frontend for adding/deleting/rearranging/describing comic pages

Webcomic.js is currently under early-stage, pre-alpha development.  While theoretically functional for production use, it's not to be considered fully realized or feature-complete.  So hold your horses, okay?
