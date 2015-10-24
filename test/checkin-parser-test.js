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
	Chance = require('chance'),
	chance = new Chance();

beforeEach(function () {
	this.mockQueue = {push: function () {}};
	this.queue = sinon.mock(this.mockQueue);
	this.handler = require('../app/checkin-parser.js')(this.mockQueue);
});

describe('checkin route', function () {
	it('responds', function (done) {
		this.queue.expects('push').callsArgWith(1, false);
		this.handler.response({}, reply);
		assert.equal(reply.called, true, 'Reply not called in the handler');
		done();
	});

	it('passes message to the queue', function (done) {
		var msg = chance.string();

		this.queue.expects('push').withExactArgs(msg, sinon.match.func).once().callsArgWith(1, false);
		this.handler.response(msg, reply);
		this.queue.verify();
		done();
	});
});

