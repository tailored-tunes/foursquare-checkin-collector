'use strict';

module.exports = function (nsq, converter, topic) {
	return {
		store: function (message, callback) {
			nsq.connect();
			nsq.on('ready', function () {
				nsq.publish(topic, converter.toSNSMessage(message), callback);
			});
		}
	};
};
