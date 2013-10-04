/*
 * grunt-angular-combine
 * https://github.com/astik/grunt-angular-combine
 *
 * Copyright (c) 2013 Romain Gonord
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {
	grunt.registerMultiTask('angular_combine', 'Combine AngularJS partials into a single HTML file.', function () {
		var options = this.options({
			appBaseDir : '',
			targetDir : ''
		});

		this.data.folders.forEach(function (folderRelativePath) {

			var currentFolderPath = options.appBaseDir + "/" + folderRelativePath;
			grunt.log.writeln("currentFolderPath =", currentFolderPath);

			var destFilePath = options.targetDir + "/" + folderRelativePath + ".html";
			grunt.log.writeln("destFilePath =", destFilePath);

			var destFileContent = "";
			destFileContent += "<!-- Merge of " + currentFolderPath + " -->/\n";

			grunt.file.recurse(currentFolderPath, function(abspath, rootdir, subdir, filename) {
				// only work with HTML files
				if (filename.indexOf(".html") > 0) {
					grunt.log.writeln("file =", filename);
					destFileContent += "<script type='text/ng-template' id='" + folderRelativePath + "/" + filename + "'>\n";
					destFileContent += grunt.file.read(currentFolderPath + "/" + filename);
					destFileContent += "</script>\n";
				}
			});

			grunt.file.write(destFilePath, destFileContent);
		});
	});
};
