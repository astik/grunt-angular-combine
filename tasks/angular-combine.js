/*
 * grunt-angular-combine
 * https://github.com/astik/grunt-angular-combine
 *
 * Copyright (c) 2013 Romain Gonord
 * Licensed under the MIT license.
 */

'use strict';

var chalk = require('chalk');

module.exports = function(grunt) {
	grunt.registerMultiTask('angularCombine', 'Combine AngularJS partials into a single HTML file.', function() {
		// define processIdentifierFunc
		var processIdentifierFunc = function(id) {
			return id;
		};
		if (this.data.options && this.data.options.processIdentifier) {
			processIdentifierFunc = this.data.options.processIdentifier;
			if (processIdentifierFunc && typeof(processIdentifierFunc) !== 'function') {
				throw new Error('angularCombine: processIdentifier must be a function.');
			}
		}

		// define includeComments
		var includeComments = true;
		if (this.data.options && this.data.options.includeComments !== undefined) {
			includeComments = !!this.data.options.includeComments;
			console.log('includeComments is set to', includeComments);
		}

		var manageFileList = function(cwd, fileAbsolutePathList) {
			var destFileContent = '';
			var i, l, abspath, id;
			for (i = 0, l = fileAbsolutePathList.length; i < l; i++) {
				abspath = fileAbsolutePathList[i];
				id = abspath.substring(cwd.length + 1);
				id = processIdentifierFunc(id);
				destFileContent += '<script type="text/ng-template" id="' + id + '">\n';
				destFileContent += grunt.file.read(abspath);
				destFileContent += '</script>\n';
			}
			return destFileContent;
		};

		var managePartialsDirectory = function(cwd, source, dest) {
			var destFileName = dest + '.html';
			var destFileContent = '';
			if (includeComments) {
				destFileContent += '<!-- Merge of ' + source + ' -->\n';
			}
			var fileAbsolutePathList = [];
			grunt.file.recurse(source, function(abspath, rootdir, subdir, filename) {
				// only work with HTML files
				if (/\.html$/.test(filename) && abspath.indexOf('/.') === -1) {
					fileAbsolutePathList.push(abspath);
				}
			});
			destFileContent += manageFileList(cwd, fileAbsolutePathList);
			grunt.file.write(destFileName, destFileContent);
			grunt.log.writeln('File ' + chalk.cyan(destFileName) + ' created.');
		};

		this.files.forEach(function(file) {
			var cwd = file.orig.cwd;
			var dest = file.dest;
			if (file.filter === 'isDirectory') {
				file.src.forEach(function(source) {
					managePartialsDirectory(cwd, source, dest);
				});
			} else {
				var fileAbsolutePathList = [];
				var i, l;
				for (i = 0, l = file.src.length; i < l; i++) {
					fileAbsolutePathList.push(cwd + '/' + file.src[i]);
				}
				var destFileContent = manageFileList(cwd, fileAbsolutePathList);
				grunt.file.write(dest, destFileContent);
				grunt.log.writeln('File ' + chalk.cyan(dest) + ' created.');
			}
		});
	});
};
