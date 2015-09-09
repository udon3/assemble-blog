module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),
    // bowercopy: copy only the neccessary files from /components/ folder 
    bowercopy: {
      options: {
        // Task-specific options go here        
        //clean: true // Bower components folder will be removed afterwards - not for now
      },
      scripts: {
        // Target-specific file lists and/or options go here 
        options: {
          srcPrefix: './src/components/',
          destPrefix: './src/assets/js/vendor/'
        },
        files: {
          // Keys are destinations (prefixed with `options.destPrefix`) 
          // Values are sources (prefixed with `options.srcPrefix`); One source per destination 
          // e.g. 'bower_components/chai/lib/chai.js' will be copied to 'test/js/libs/chai.js' 
          'jquery.js': 'jquery/index.js',
          'modernizr.js': 'modernizr/modernizr.js'
        }
        
      }
    },
    copy: {
      fonts: {
        files: [
          {
            expand: true, 
            flatten: true, 
            src: ['src/assets/sass/fonts/*'], 
            dest: 'dist/assets/css/fonts/'
          }
        ]
      },
      images: {
        files: [
          { 
            expand: true,
            cwd: 'src/assets/images/', 
            src: ['**/*.{png,jpg,svg}'], 
            dest:'dist/assets/images/' 
          }
        ]
      }
    },
    // grunt-contrib-connect: run a local web server
    connect: {
      dev: {
        options: {
          port: 8000,
          base: './dist/',        //Note: the leading '.' denotes 'current directory', so this is a relative URI
          livereload: true //allows watch to run livereload
          // http://localhost:8000/
        }
      }
    },
    //grunt-contrib-jshint - http://www.jshint.com/docs/
    jshint: {
      files: [
        'gruntfile.js', 
        'src/assets/js/apps/**/*.js'
        //'!src/assets/js/vendor/modernizr.js'
      ],
      options: {
        globals: {
          $: true,
          jQuery: true,
          console: true,
          module: true,
          document: true
        },
        quotmark: true,
        undef: true, //If variable is defined in another file, use the global directive to tell JSHint about it.
        unused: true
      }
    },
    //grunt-contrib-concat: concatenate all js files into one
    // Now thinking of using require.js...
    concat: {
      options: {
        // string output between each file being concatenated
        separator: ';\n'
      },
      vendors: {
        src: [
          './src/assets/js/vendor/jquery1.11.2.js',
          './src/assets/js/vendor/*.js',
          '!./src/assets/js/vendor/modernizr.js'
        ],
        dest: './dist/assets/js/vendor-scripts.js'
      },
      headscripts: {
         src: ['./src/assets/js/vendor/modernizr.js'],
         dest: './dist/assets/js/modernizr.js'
      },
      apps: {
        src: [
          './src/assets/js/apps/setup.js',
          './src/assets/js/apps/utils.js',
          './src/assets/js/apps/**/*.js',
          './src/assets/js/apps/init.js'
        ],
        dest: './dist/assets/js/apps-scripts.js'
      }
    },
    // grunt-contrib-uglify: minify js
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
        mangle: false
      },
      vendors: {
        files: {
          './dist/assets/js/vendors.min.js': ['<%= concat.vendors.dest %>']
        }
      },
      headscripts: {
        files: {
          './dist/assets/js/modernizr.min.js': ['<%= concat.headscripts.dest %>']
        }
      },
      apps: {
         files: {
          './dist/assets/js/apps.min.js': ['<%= concat.apps.dest %>']
        }
      }
    },
    //grunt-contrib-compass: sass/compass compilation
    compass: {
      dist: {
        options: {
          sassDir: './src/assets/sass/',
          cssDir: './dist/assets/css/'
        }
      }
    },
    //grunt-contrib-cssmin
    cssmin: {
      target: {
        options: {
          banner: '/*! <%= pkg.name %> <%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
        },
        files: {
          './dist/assets/css/main.min.css' : './dist/assets/css/main.css'
        }
      }
    },
    //grunt-htmlhint: Check the html, ensure it's valid
    htmlhint: {
      build: {
        options: {
          'tag-pair': true,
          'tagname-lowercase': true,
          'attr-lowercase': true,
          'doctype-first': true,
          'spec-char-escape': true,
          'id-unique': true,
          'head-script-disabled': true,
          'style-disabled': true
        },
        src: ['./dist/*.html']
      }
    },
    //assemble: site generator for grunt
    //(N.B.targets don't work with withSort - https://github.com/assemble/assemble/issues/516)
    assemble: {
      options: {
        layout: 'page.hbs',
        layoutdir: './src/templates/layouts/',  
        partials: './src/templates/partials/**/*.hbs',
        helpers: './src/templates/helpers/**/*.js',   //location of handlebars helper file
        data: './src/data/*.{json,yml}'
      },
      posts: {
        files: [
          {
            cwd: './src/content/',
            dest: './dist/',
            expand: true,
            src: ['blog/**/*.md', '**/*.hbs', '!_pages/**/*.hbs']
          }, 
          {
            cwd: './src/content/_pages/',
            dest: './dist/',
            expand: true,
            src: '**/*.md'
          }
        ],
        options: {
          collections: [
            {
              name: 'post',
              sortby: 'posted',
              sortorder: 'descending'
            },
            {
              name: 'landing',
              sortby: 'order',
              sortorder: 'ascending'
            }
          ]
        }
      }
    },
    //grunt-contrib-watch: watch for changes (livereload activated)
    watch: {
      html: {
        files: ['./src/**/*.hbs', './src/**/*.md'],
        tasks: ['assemble']
      },
      css: {
        files: '**/*.scss',
        tasks: ['compass'] 
      },
      data: {
        files: ['./src/data/*.json']
      },
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint'] 
      },
      options: {
        livereload: true
      }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-bowercopy');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-htmlhint');


  /* grunt tasks */
  // Start web server
  grunt.registerTask('default', ['newer:bowercopy', 'copy', 'newer:htmlhint', 'newer:compass', 'newer:cssmin', 'newer:jshint', 'newer:concat', 'newer:uglify']);
  grunt.registerTask('js', ['newer:jshint', 'newer:concat', 'newer:uglify']);
  grunt.registerTask('server', ['newer:assemble', 'connect', 'watch']);

  

};