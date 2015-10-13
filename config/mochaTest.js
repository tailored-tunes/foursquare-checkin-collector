'use strict';

module.exports = function (grunt, config) {
	return {
		cli: {
			options: {
				colors: true,
				reporter: 'spec',
				quiet: false,
				clearRequireCache: false
			},
			src: config.jsTestFiles
		},
		watch: {
			options: {
				colors: true,
				reporter: 'spec',
				quiet: false,
				clearRequireCache: true
			},
			src: config.jsTestFiles
		},
		jenkins: {
			options: {
				colors: true,
				reporter: 'xunit',
				captureFile: config.reportsDir + '/js-junit.xml',
				quiet: false,
				clearRequireCache: false,
				require: 'test/blanket'
			},
			src: config.jsTestFiles
		},
		coverage: {
			options: {
				reporter: 'html-cov',
				quiet: true,
				captureFile: config.reportsDir + '/coverage.html'
			},
			src: config.jsTestFiles
		},
		'travis-coverage': {
			options: {
				threshold: 0,
				reporter: 'travis-cov'
			},
			src: config.jsTestFiles
		}
	};
};
