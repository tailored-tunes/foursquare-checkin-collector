'use strict';

module.exports = function (sns, converter) {
	return {
		store: function (message, callback) {
			sns.publish(converter.toSNSMessage(message), callback);
		}
	};
};
