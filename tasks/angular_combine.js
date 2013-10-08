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

			grunt.file.recurse(currentFolderPath, function (abspath, rootdir, subdir, filename) {
				// only work with HTML files
				if (/\.html$/.test(filename)) {
					// grunt.log.writeln("*** new file ***");
					// grunt.log.writeln("abspath =", abspath);
					// grunt.log.writeln("rootdir =", rootdir);
					// grunt.log.writeln("subdir =", subdir);
					// grunt.log.writeln("filename =", filename);
					var id = folderRelativePath + "/" + filename;
					if (subdir) {
						id = folderRelativePath + "/" + subdir + "/" + filename;
					}
					destFileContent += "<script type='text/ng-template' id='" + id + "'>\n";
					destFileContent += grunt.file.read(abspath);
					destFileContent += "</script>\n";
				}
			});

			grunt.file.write(destFilePath, destFileContent);
		});
	});
};
