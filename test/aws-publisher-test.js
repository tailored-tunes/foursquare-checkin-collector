'use strict';

/* global describe: true, it: true, beforeEach: true */

var assert = require('assert'),
	sinon = require('sinon'),
	Chance = require('chance'),
	chance = new Chance();

beforeEach(function () {
	this.converterApi = {toSNSMessage: function () {}};
	this.mockConverter = sinon.mock(this.converterApi);
	this.mockSnsApi = {publish: function () {}};
	this.mockSns = sinon.mock(this.mockSnsApi);
	this.message = chance.string();
});

describe('The aws publisher', function () {
	it('should call the 3rd party publisher with the correct message', function (done) {
		var cb = sinon.stub(),
			randomMessage = chance.string(),
			publisher = require('../app/lib/aws-publisher')(this.mockSnsApi, this.converterApi);

		this.mockConverter.expects('toSNSMessage').once().withArgs(this.message).returns(randomMessage);
		this.mockSns.expects('publish').once().withArgs(randomMessage, cb).callsArgWith(1, false);

		publisher.store(this.message, cb);
		assert.equal(cb.calledWith(false), true);
		this.mockSns.verify();

		done();
	});

	it('should handle errors', function (done) {
		var cb = sinon.stub(),
			randomMessage = chance.string(),
			publisher = require('../app/lib/aws-publisher')(this.mockSnsApi, this.converterApi);

		this.mockConverter.expects('toSNSMessage').once().withArgs(this.message).returns(randomMessage);
		this.mockSns.expects('publish').once().withArgs(randomMessage, cb).callsArgWith(1, true);
		publisher.store(this.message, cb);

		assert.equal(cb.calledWith(true), true);
		this.mockSns.verify();

		done();
	});
});
