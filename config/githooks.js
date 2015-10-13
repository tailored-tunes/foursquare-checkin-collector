'use strict';

module.exports = function () {
	return {
		tatu: {
			'pre-commit': 'pre-verify',
			'pre-push': 'default',
			'post-merge': {
				command: 'npm install'
			}
		}
	};
};
