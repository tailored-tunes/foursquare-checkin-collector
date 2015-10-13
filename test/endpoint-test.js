'use strict';

var Hapi = require('hapi'),
	chai = require('chai'),
	assert = chai.assert,
	server,
	Chance = require('chance'),
	chance = new Chance(),
	handler = {
		response: function () {}
	},
	responseText;

describe('/checkin', function () {

	beforeEach(function (done) {
		responseText = chance.string();
		handler.response = function (request, reply) {
			reply(responseText);
		};
		server = new Hapi.Server();
		server.connection({host: 'test'});

		require('../app/checkin-route.js')(server, handler);
		done();
	});

	afterEach(function (done) {
		server.stop(done);
	});

	it('should accept POST', function (done) {
		var request = {
			checkin: {},
			unimportant: {}
		};

		server.inject({method: 'POST', url: '/checkin?secret=boo', payload: request}, function (res) {
			assert.equal(res.statusCode, 200, 'POST to /checkin failed');
			assert.equal(res.payload, responseText, 'POST to /checkin did not pass message to the handler');
			done();
		});
	});

	it('should not accept GET', function (done) {
		server.inject({method: 'GET', url: '/checkin'}, function (res) {
			assert.equal(res.statusCode, 404, 'Was able to call GET');
			done();
		});
	});

	it('fails without secret param', function (done) {
		server.inject({method: 'POST', url: '/checkin'}, function (res) {
			assert.equal(res.statusCode, 400, 'POST to /checkin passed without a secret');
			done();
		});
	});

	it('fails without checkin data', function (done) {
		var request = {};

		server.inject({method: 'POST', url: '/checkin?secret=boo', payload: request}, function (res) {
			assert.equal(res.statusCode, 400, 'POST to /checkin passed without checkin data');
			done();
		});
	});
});

describe('global app', function () {
	it('should fail for bad url', function (done) {
		server.inject({method: 'POST', url: '/not-existing'}, function (res) {
			assert.equal(res.statusCode, 404, 'Not existing route did not cause 404');
			done();
		});
	});
});
