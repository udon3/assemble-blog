# Assemblog: a simple static site with Assemble with blog like features

A simple skeletal set up for a static site build using [**Grunt**](http://gruntjs.com/) and [**Assemble**](http://assemble.io/).

Please note this isn't some framework by any kind of guru.

Created as a means to get to grips with the **Grunt** workflow (I'm still learning as I go in all aspects - Grunt, Assemble, Handlebars...).

## The set up

Requires a global install of: 

- Node.js + npm (for installing packages + grunt)
- Grunt CLI (the command line tool for Grunt)
- Ruby (need it for Sass comp - may look into Libsass at some point) 
- Compass 

Local install:

- Bower (for importing plugins and 3rd party libraries*)

*Found that Bower installs the entire repo for a plugin/library, so currently neccessary to copy over only the wanted files into the assets folder (see project structure below). 

## Grunt workflow - lists of packages (so far...)

(see `package.json`)

- grunt (obvious)
- bower
- bowercopy
- grunt-contrib-copy (need this to automate copying over font files and images to /dist/)

site generation:

- assemble

html validation:

- grunt-htmlhint

sass compilation + minification:

- grunt-contrib-compass
- grunt-contrib-cssmin

js concatenation, validation, minification:

- grunt-contrib-concat
- grunt-contrib-jshint
- grunt-contrib-uglify

set up local server, watch and livereload:

- grunt-contrib-connect
- grunt-contrib-watch
- grunt-newer

(...to add later: image optimisation? grunt-load-tasks package to automate task loading?)



## Project structure

`src` folder for dev and `dist` folder for built website.

	assemble-blog/
	  |
	  |-- dist/             (assemble-built website)
	  |
	  |-- src/              (dev files)
	  |     |-- content/
	  |     |      |-- pages/
	  |     |      |		 |-- my-page.hbs 			(using handlebars)
	  |     |      |
	  |     |      |
	  |     |      |-- blog/
	  |     |            |-- my-blog-post.md    (using markdown)
	  |     |
	  |     |-- templates/
	  |     |      |-- layouts/
	  |     |      |        |-- index.hbs    (using handlebars)
	  |     |      |        
	  |     |      |-- partials/
	  |     |               |-- header.hbs    (using handlebars)
	  |     |               |-- footer.hbs    (using handlebars)
	  |     |               |-- header-scripts.hbs    (e.g. modernizr needs to be loaded before DOM)
	  |     |               |-- footer-scripts.hbs    (all other scripts)
	  |     | 
		|     |-- components/ (plugins installed via bower, storage - copying files from here to /assets/js/vendor/ ) 
	  |     | 
		|     |-- assets
		|						 |-- sass/
		|            |    |-- /sass component folders (vaguely SMACS but not quite)/
		|            |    |-- /fonts		(font files here)
		|            |    |-- main.scss 	(imports all sass files)
		|            |    
		|						 |-- js/
		|            |    |-- vendor/     (bower copy will copy files from /src/component/ to here)
		|            |    |-- apps/ 			(1st-party component scripts)
		|            |    |-- init.js 		(not sure yet - aiming for modular pattern)
		|						 |	
	  |            |-- images
		|                          
		|-- node_modules/
		|-- gruntfile.js
		|-- package.json
		|-- bower.json
		|-- .bowerrc (change destination folder for plugins - currently pointing to /src/components/)


## Some important resources:

[http://assemble.io/docs/](http://assemble.io/docs/)

This [blog article](http://www.andismith.com/blog/2014/02/getting-started-with-assemble/) was a great help to begin with.









### Gruntfile



### Assemble config

[Config options for asssemble](http://assemble.io/docs/Options.html)

assemble's config is all done in the gruntfile (inside `assemble {}`)

Make sure all file extensions (.md, .hbs) are included in the watch and assemble files array.

### Handlebars templating

[http://handlebarsjs.com/](http://handlebarsjs.com/)

#### Handlebars helpers

[see Helpers section at Handlebarsjs.com](http://handlebarsjs.com/expressions.html)

[Built-in helpers](http://handlebarsjs.com/builtin_helpers.html)

[Assemble handlebars helpers](http://assemble.io/helpers/)



## Next steps: 

- set up scripts using the [module pattern](http://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript)