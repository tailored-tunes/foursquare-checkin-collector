'use strict';

module.exports = function (sns) {
	return {
		store: function (message, callback) {
			sns.publish(message, callback);
		}
	};
};
