/*
 * grunt-angular-combine
 * https://github.com/astik/grunt-angular-combine
 *
 * Copyright (c) 2013 Romain Gonord
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint : {
			options : {
				jshintrc : '.jshintrc'
			},
			all : [ 'Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>' ]
		},

		jscs: {
			options: {
				config: ".jscsrc"
			},
			all: {
				src: [ 'tasks/*.js' ]
			}
		},

		jsbeautifier: {
			options: {
				config: '.jsbeautifier'
			},
			all: [ 'tasks/*.js' ]
		},

		// Before generating any new files, remove any previously-created files.
		clean : {
			tests : [ 'tmp' ]
		},

		// Configuration to be run (and then tested).
		angularCombine : {
			combine : {
				files : [ {
					expand : true,
					cwd : 'test/fixtures',
					src : 'test*',
					dest : 'tmp/combined',
					filter : 'isDirectory'
				} ]
			},
			combineWithChangeIdentifier : {
				options : {
					processIdentifier : function(id) {
						// just use the files name without extension as identifier
						return id.split('/').pop().replace('.html', '');
					}
				},
				files : [ {
					expand : true,
					cwd : 'test/fixtures',
					src : 'combineWithChangeIdentifier',
					dest : 'tmp/combined',
					filter : 'isDirectory'
				} ]
			},
			combineWithoutComment : {
				options : {
					includeComments : false
				},
				files : [ {
					expand : true,
					cwd : 'test/fixtures',
					src : 'combineWithoutComment',
					dest : 'tmp/combined',
					filter : 'isDirectory'
				} ]
			},
			cherryPick : {
				files : [ {
					cwd : 'test/fixtures',
					src : [ 'cherryPick/bar.html', 'cherryPick/woot.html' ],
					dest : 'tmp/combined/cherryPick1.html'
				}, {
					cwd : 'test/fixtures',
					src : 'cherryPick/foo.html',
					dest : 'tmp/combined/cherryPick2.html'
				}, {
					cwd : 'test/fixtures',
					src : [ 'cherryPick/*.html', '!cherryPick/foo.html' ],
					dest : 'tmp/combined/cherryPick3.html'
				} ]
			}
		},

		// Unit tests.
		nodeunit : {
			tests : [ 'test/*_test.js' ]
		},

		release : {
			options : {
				tagName : 'v<%= version %>'
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	require('load-grunt-tasks')(grunt);

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', [ 'clean', 'angularCombine', 'nodeunit' ]);

	// By default, lint and run all tests.
	grunt.registerTask('default', [ 'jsbeautifier:all', 'jshint:all', 'jscs:all', 'test' ]);

};
