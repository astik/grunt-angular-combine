/*
 * grunt-angular-combine
 * https://github.com/astik/grunt-angular-combine
 *
 * Copyright (c) 2013 Romain Gonord
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	grunt.registerMultiTask('angularCombine', 'Combine AngularJS partials into a single HTML file.', function() {

		// define processIdentifierFunc
		var processIdentifierFunc = function(id) {
			return id;
		};
		if (this.data.options && this.data.options.processIdentifier) {
			processIdentifierFunc = this.data.options.processIdentifier;
			if (processIdentifierFunc && typeof (processIdentifierFunc) !== 'function') {
				throw new Error('angularCombine: processIdentifier must be a function.');
			}
		}

		// define includeComments
		var includeComments = true;
		if (this.data.options && this.data.options.includeComments !== undefined) {
			includeComments = !!this.data.options.includeComments;
			console.log('includeComments is set to', includeComments);
		}

		var managePartialsDirectory = function(cwd, source, dest, a, b) {
			var destFileContent = "";

			if (includeComments) {
				destFileContent += "<!-- Merge of " + source + " -->\n";
			}

			grunt.file.recurse(source, function(abspath, rootdir, subdir, filename) {
				// only work with HTML files
				if (/\.html$/.test(filename) && abspath.indexOf('/.') === -1) {
					var id = abspath.substring(cwd.length + 1);
					id = processIdentifierFunc(id);
					destFileContent += "<script type='text/ng-template' id='" + id + "'>\n";
					destFileContent += grunt.file.read(abspath);
					destFileContent += "</script>\n";
				}
			});

			grunt.file.write(dest + '.html', destFileContent);
		};
		this.files.forEach(function(file) {
			var cwd = file.orig.cwd;
			var dest = file.dest;
			file.src.forEach(function(source) {
				managePartialsDirectory(cwd, source, dest);
			});
		});
	});
};
