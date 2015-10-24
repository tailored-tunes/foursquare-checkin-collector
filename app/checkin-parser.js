'use strict';

module.exports = function (queue) {
	return {
		response: function (request, reply) {
			queue.push(request, function (err) {
				if (err) {
					reply(new Error(err));
				} else {
					reply('{}');
				}
			});
		}
	};
};
