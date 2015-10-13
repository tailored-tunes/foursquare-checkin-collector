'use strict';

module.exports = function (grunt, options) {

	return {
		base: {
			options: {
				configFile: '<%= configDir %>/.eslintrc',
				format: 'stylish'
			},
			files: [
				{
					src: options.jsFiles
				}
			]
		},
		tests: {
			options: {
				configFile: '<%= configDir %>/.eslintrc-test',
				format: 'stylish'
			},
			files: [
				{
					src: options.jsTestFiles
				}
			]
		},
		jenkins: {
			options: {
				configFile: '<%= configDir %>/.eslintrc',
				format: 'checkstyle',
				outputFile: '<%= reportsDir %>/jshint-checkstyle.xml'
			},
			files: [
				{
					src: options.jsFiles
				}
			]
		}
	};
};
