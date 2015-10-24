'use strict';

module.exports = function (snsTopic, awsRegion, retryCount) {
	var AWS = require('aws-sdk'),
		sns = new AWS.SNS({params: {TopicArn: snsTopic}}),
		publisher = require('./publisher')(sns);

	AWS.config.update({
		region: awsRegion || 'us-east-1',
		maxRetries: retryCount || 3
	});

	return publisher;
};
