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
			all : [ 'Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>' ],
			options : {
				jshintrc : '.jshintrc'
			}
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
			}
		},

		// Unit tests.
		nodeunit : {
			tests : [ 'test/*_test.js' ]
		},

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', [ 'clean', 'angularCombine', 'nodeunit' ]);

	// By default, lint and run all tests.
	grunt.registerTask('default', [ 'jshint', 'test' ]);

};
