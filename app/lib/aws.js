'use strict';

var AWS = require('aws-sdk'),
	messageConverter = require('./messageConverter');

AWS.config.update({
	maxRetries: 3
});

module.exports = function (snsTopic, awsRegion) {
	var sns = new AWS.SNS({params: {TopicArn: snsTopic, region: awsRegion}}),
		publisher = require('./aws-publisher')(sns, messageConverter);

	return publisher;
};
