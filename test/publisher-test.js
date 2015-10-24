'use strict';

/* global describe: true, it: true, beforeEach: true */

var assert = require('assert'),
	sinon = require('sinon'),
	Chance = require('chance'),
	chance = new Chance();

beforeEach(function () {
	this.mockSnsApi = {publish: function () {}};
	this.mockSns = sinon.mock(this.mockSnsApi);
	this.message = chance.string();
});

describe('The publisher', function () {
	it('should call the 3rd party publisher with the correct message', function (done) {
		var cb = sinon.stub(),
			publisher = require('../app/lib/publisher')(this.mockSnsApi);

		this.mockSns.expects('publish').once().withArgs(this.message, cb).callsArgWith(1, false);

		publisher.store(this.message, cb);
		assert.equal(cb.calledWith(false), true);
		this.mockSns.verify();

		done();
	});

	it('should handle errors', function (done) {
		var cb = sinon.stub(),
			publisher = require('../app/lib/publisher')(this.mockSnsApi);

		this.mockSns.expects('publish').once().withArgs(this.message, cb).callsArgWith(1, true);

		publisher.store(this.message, cb);

		assert.equal(cb.calledWith(true), true);
		this.mockSns.verify();

		done();
	});
});
