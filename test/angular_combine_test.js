'use strict';

var grunt = require('grunt');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports.angularCombine = {
	setUp : function (done) {
		// setup here if necessary
		done();
	},
	test1 : function (test) {
		var actual = grunt.file.read('tmp/combined/test1.html');
		var expected = grunt.file.read('test/expected/test1.html');
		test.equal(actual, expected, 'test1 files should be equals.');
		test.done();
	},
	test2 : function (test) {
		var actual = grunt.file.read('tmp/combined/test2.html');
		var expected = grunt.file.read('test/expected/test2.html');
		test.equal(actual, expected, 'test2 files should be equals.');
		test.done();
	},
	test3 : function (test) {
		var actual = grunt.file.read('tmp/combined/test3.html');
		var expected = grunt.file.read('test/expected/test3.html');
		test.equal(actual, expected, 'test3 files should be equals.');
		test.done();
	},
	combineWithChangeIdentifier : function (test) {
		var actual = grunt.file.read('tmp/combined/combineWithChangeIdentifier.html');
		var expected = grunt.file.read('test/expected/combineWithChangeIdentifier.html');
		test.equal(actual, expected, 'combineWithChangeIdentifier files should be equals.');
		test.done();
	},
	combineWithoutComment : function (test) {
		var actual = grunt.file.read('tmp/combined/combineWithoutComment.html');
		var expected = grunt.file.read('test/expected/combineWithoutComment.html');
		test.equal(actual, expected, 'combineWithoutComment files should be equals.');
		test.done();
	},
	cherryPick : function (test) {
		// part 1
		var actual = grunt.file.read('tmp/combined/cherryPick1.html');
		var expected = grunt.file.read('test/expected/cherryPick1.html');
		test.equal(actual, expected, 'cherryPick files (part1) should be equals.');
		// part 2
		actual = grunt.file.read('tmp/combined/cherryPick2.html');
		expected = grunt.file.read('test/expected/cherryPick2.html');
		test.equal(actual, expected, 'cherryPick files (part2) should be equals.');
		// part 3
		actual = grunt.file.read('tmp/combined/cherryPick3.html');
		expected = grunt.file.read('test/expected/cherryPick3.html');
		test.equal(actual, expected, 'cherryPick files (part3) should be equals.');
		test.done();
	}
};
