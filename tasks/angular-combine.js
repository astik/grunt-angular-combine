/*
 * grunt-angular-combine
 * https://github.com/astik/grunt-angular-combine
 *
 * Copyright (c) 2013 Romain Gonord
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('angularCombine', 'Combine AngularJS partials into a single HTML file.', function () {
		var managePartialsDirectory = function(cwd, source, dest){
			var destFileContent = "";
			destFileContent += "<!-- Merge of " + source + " -->/\n";

			grunt.file.recurse(source, function (abspath, rootdir, subdir, filename) {
				// only work with HTML files
				if (/\.html$/.test(filename) && abspath.indexOf('/.') === -1) {
					var id = abspath.substring(cwd.length + 1);
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
