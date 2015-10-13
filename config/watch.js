'use strict';

module.exports = function (grunt, options) {

	grunt.event.on('watch', function (action, filepath) {
		if (grunt.file.isMatch(options.jsTestFiles, filepath)) {
			grunt.config('mochaTest.cli.src', filepath);
			grunt.config('eslint.tests.src', filepath);
		}
	});

	return {
		js: {
			files: options.jsFiles,
			tasks: [
				'pre-verify:js'
			]
		},
		jsTest: {
			files: options.jsTestFiles,
			tasks: [
				'eslint:tests',
				'mochaTest:watch'
			],
			options: {
				spawn: false
			}
		},
		jshint: {
			files: [
				'config/.eslintrc',
				'config/.eslintrc-test'
			],
			tasks: [
				'pre-verify:js'
			],
			options: {
				reload: true
			}
		},
		configFiles: {
			files: [
				'Gruntfile.js',
				'config/**/*.js'
			],
			tasks: [
				'pre-verify:js'
			],
			options: {
				reload: true
			}
		},
		hooks: {
			files: [
				options.configDir + '/githooks.js'
			],
			tasks: [
				'githooks'
			]
		}
	};
};
