'use strict';

var AWS = require('aws-sdk');

AWS.config.update({
	maxRetries: 3
});

module.exports = function (snsTopic, awsRegion) {
	var sns = new AWS.SNS({params: {TopicArn: snsTopic, region: awsRegion}}),
		publisher = require('./publisher')(sns);

	return publisher;
};
