'use strict';

module.exports = function (publisher) {
	return {
		push: function (data, callback) {
			publisher.store(data, function (err) {
				if (err) {
					callback(true);
				} else {
					callback();
				}
			});
		}
	};
};
