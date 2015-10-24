'use strict';

module.exports = function (host, port, topic) {
	var nsq = require('nsqjs'),
		messageConverter = require('./message-converter'),
		w = new nsq.Writer(host, port),
		publisher = require('./nsq-publisher')(w, messageConverter, topic);

	return publisher;
};
