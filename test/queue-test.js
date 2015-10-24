'use strict';

/* global describe: true, it: true, beforeEach: true */

var sinon = require('sinon'),
	Chance = require('chance'),
	chance = new Chance();

beforeEach(function () {
	this.mockPublisher = {store: function () {}};
	this.publisher = sinon.mock(this.mockPublisher);
});

describe('The queue', function () {
	it('should report success', function (done) {

		var msg = chance.string(),
			q = require('../app/lib/queue')(this.mockPublisher);

		this.publisher.expects('store').withExactArgs(msg, sinon.match.func).once().callsArgWith(1, false);
		q.push(msg, done);
	});

	it('should report error', function (done) {

		var msg = chance.string(),
			q = require('../app/lib/queue')(this.mockPublisher);

		this.publisher.expects('store').withExactArgs(msg, sinon.match.func).once().callsArgWith(1, true);
		q.push(msg, function (err) {
			if (err) {
				done();
			} else {
				done(true);
			}
		});
	});
});

