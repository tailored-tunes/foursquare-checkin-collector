'use strict';

var Joi = require('joi');

module.exports = function (server, handler) {
	server.route({
		method: 'POST',
		path: '/checkin',
		handler: handler.response,
		config: {
			validate: {
				query: {
					secret: Joi.string().required()
				},
				payload: Joi.object({
					checkin: Joi.object().required()
				}).unknown()
			}
		}
	});
};
