'use strict';

// be -> {
// 	headers: {},
// 	payload: '{}'
// }
// erdekes -> van-e checkin param
// tovabb -> { //checkin data
// }

var chai = require('chai'),
	assert = chai.assert,
	sinon = require('sinon'),
	reply = sinon.spy(),
	handler = require('../app/checkin-parser.js');

describe('checkin route', function () {
	it('responds', function (done) {
		handler.response({}, reply);
		assert.equal(reply.called, true, 'Reply not called in the handler');
		done();
	});
});

