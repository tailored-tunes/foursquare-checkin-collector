'use strict';

var path = require('path');

module.exports = function (grunt) {

	var runModeMessage = 'Running Grunt in DEV mode',
		options = {
			configDir: path.resolve('./config'),
			reportsDir: path.resolve('./reports'),
			isProd: Boolean(grunt.option('production')),
			isStaging: Boolean(grunt.option('staging')),
			isJenkins: Boolean(grunt.option('jenkins')),
			jsFiles: [
				'Gruntfile.js',
				'app/**/*.js',
				'config/**/*.js'
			],
			jsTestFiles: [
				'test/**/*.js'
			]
		},
		configs = require('load-grunt-configs')(grunt, options);

	require('load-grunt-tasks')(grunt);

	if (options.isProd) {
		runModeMessage = 'Running Grunt in PRODUCTION mode';
	} else if (options.isStaging) {
		runModeMessage = 'Running Grunt in STAGING mode';
	}

	grunt.log.subhead(runModeMessage);

	grunt.verbose.subhead('Main configuration');
	grunt.verbose.writeflags(options);

	grunt.initConfig(configs);

	grunt.registerTask('default', [
		'clean:all',
		'pre-verify'
	]);

	grunt.registerTask('check-for-updates', function () {
		if (!options.isProd && !options.isStaging && !options.isJenkins) {
			grunt.task.run('check-modules');
		}
	});

	grunt.registerTask('pre-verify:js', function () {
		if (options.isJenkins) {
			grunt.task.run('eslint:jenkins');
			grunt.task.run('mochaTest:jenkins');
			grunt.task.run('mochaTest:coverage');
		} else {
			grunt.task.run('eslint:base');
			grunt.task.run('eslint:tests');
			grunt.task.run('mochaTest:cli');
		}

	});

	grunt.registerTask('pre-verify', [
		'pre-verify:js'
	]);
};
