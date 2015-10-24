'use strict';

module.exports = {
	toSNSMessage: function (original) {
		return {Message: JSON.stringify(original)};
	}
};
