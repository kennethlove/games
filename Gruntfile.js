'use strict';

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({

        // Watch Config
        watch: {
            files: ['views/**/*'],
            options: {
                livereload: true
            },
            scripts: {
                files: [
                    'assets/scripts/**/*.js',
                ],
                tasks: ['browserify']
            },
            css: {
                files: [
                    'assets/styles/**/*.css',
                ],
            },
            sass: {
                files: ['assets/styles/**/*.scss'],
                tasks: ['sass:dev']
            },
            images: {
                files: [
                    'assets/images/**/*.{png,jpg,jpeg,webp}'
                ],
            },
            express: {
                files:  [ 'app.js', '!**/node_modules/**', '!Gruntfile.js' ],
                tasks:  [ 'express:dev' ],
                options: {
                    nospawn: true // Without this option specified express won't be reloaded
                }
            },
        },

        // Clean Config
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'build/*',
                        '!build/.git*'
                    ]
                }]
            },
            server: ['.tmp'],
        },

        // Hint Config
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'assets/scripts/**/*.js',
                '!assets/build/**/*.js',
                'test/spec/**/*.js'
            ]
        },

        // Sass Config
        sass: {
            options: {
                cacheLocation: '.tmp/.sass-cache'
            },
            dev: {
                options: {
                    style: 'expanded',
                    lineComments: true
                },
                files: [{
                    expand: true,
                    cwd: 'assets/styles/sass',
                    dest: 'assets/styles',
                    src: ['screen.scss'],
                    ext: '.css'
                }]
            }
        },

        // Express Config
        express: {
            options: {
              // Override defaults here
            },
            dev: {
                options: {
                    script: 'app.js'
                }
            }
        },

        // Rev Config
        rev: {
            dist: {
                files: {
                    src: [
                        'build/assets/scripts/**/*.js',
                        'build/assets/styles/**/*.css',
                        'build/assets/images/**/*.{png,jpg,jpeg,gif,webp}',
                        'build/assets/styles/fonts/**/*.*'
                    ]
                }
            }
        },

        // Usemin Config
        useminPrepare: {
            options: {
                dest: 'build/assets'
            },
            html: ['assets/{,*/}*.html', 'views/**/*.handlebars']
        },
        usemin: {
            options: {
                dirs: ['build/assets'],
                basedir: 'build/assets',
            },
            html: ['build/assets/{,*/}*.html', 'build/views/**/*.handlebars'],
            css: ['build/assets/styles/{,*/}*.css']
        },

        // Imagemin Config
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'build/assets/images'
                }]
            }
        },

        // SVGmin Config
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'assets/images',
                    src: '{,*/}*.svg',
                    dest: 'build/assets/images'
                }]
            }
        },

        // CSSmin config
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            // dist: {
            //     files: {
            //         'dist/assets/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             'assets/styles/{,*/}*.css'
            //         ]
            //     }
            // }
        },

        // HTML Config
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: 'assets',
                    src: '*.html',
                    dest: 'dist/assets'
                }]
            }
        },

        // Copy Config
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'assets',
                    dest: 'dist/assets',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'images/**/*.{webp,gif}',
                        'styles/fonts/{,*/}*.*',
                    ]
                }, {
                    expand: true,
                    dot: true,
                    cwd: 'views',
                    dest: 'dist/views/',
                    src: '**/*.handlebars',
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: 'assets/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
        },

        // Concurrent Config
        concurrent: {
            dist: [
                'copy:styles',
                'svgmin',
                'htmlmin',
                'browserify'
            ]
        },

        browserify: {
            dist: {
                options: {
                    shim: {
                        jquery: {
                            path: 'node_modules/jquery/dist/jquery.js',
                            exports: '$'
                        },
                        underscore: {
                            path: 'node_modules/underscore/underscore.js',
                            exports: '_'
                        },
                        backbone: {
                            path: 'node_modules/backbone/backbone.js',
                            exports: 'Backbone',
                            depends: {
                                underscore: 'underscore'
                            }
                        },
                        'backbone.babysitter': {
                            path: 'node_modules/backbone.marionette/node_modules/backbone.babysitter/lib/backbone.babysitter.js',
                            exports: 'Backbone.Babysitter',
                            depends: {
                                backbone: 'Backbone'
                            }
                        },
                        'backbone.wreqr': {
                            path: 'node_modules/backbone.marionette/node_modules/backbone.wreqr/lib/backbone.wreqr.js',
                            exports: 'Backbone.Wreqr',
                            depends: {
                                backbone: 'Backbone'
                            }
                        },
                        'backbone.marionette': {
                            path: 'node_modules/backbone.marionette/lib/backbone.marionette.js',
                            exports: 'Marionette',
                            depends: {
                                jquery: '$',
                                backbone: 'Backbone',
                                underscore: '_'
                            }
                        }
                    }
                },
                files: {
                    'assets/build/scripts/client.js': ['assets/scripts/**/*.js']
                }
            }
        }
    });

    // Register Tasks
    // Workon
    grunt.registerTask('workon', 'Start working on this project.', [
        'jshint',
        'sass:dev',
        'express:dev',
        'watch'
    ]);


    // Restart
    grunt.registerTask('restart', 'Restart the server.', [
        'express:dev',
        'watch'
    ]);
    

    // Build
    grunt.registerTask('build', 'Build production ready assets and views.', [
        'clean:dist',
        'concurrent:dist',
        'useminPrepare',
        'imagemin',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'rev',
        'usemin',
    ]);

};
