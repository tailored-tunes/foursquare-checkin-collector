'use strict';

var assert = require('assert'),
	Chance = require('chance'),
	chance = new Chance(),
	incomingMessage = {
		source: chance.string(),
		id: chance.string(),
		userToken: chance.string(),
		missingTracklistApiUrl: chance.string(),
		time: chance.timestamp()
	},
	messageConverter = require('../app/lib/message-converter');

describe('Message converter', function () {
	it('should convert internal message to SNS messages', function (done) {

		var expected = {Message: JSON.stringify(incomingMessage)},
			actual = messageConverter.toSNSMessage(incomingMessage);

		assert.deepEqual(actual, expected);
		done();
	});
});
