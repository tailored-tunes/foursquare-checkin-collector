'use strict';

var Hapi = require('hapi'),
	server = new Hapi.Server(),
	publisher = require('./app/lib/aws.js')(process.env.SNS_TOPIC, process.env.AWS_REGION),
	queue = require('./app/lib/queue.js')(publisher),
	handler = require('./app/checkin-parser.js')(queue),
	port = process.env.PORT || 8000;

server.connection({
	port: port,
	routes: {
		cors: true
	}
});

require('./app/checkin-route.js')(server, handler);

server.start(function () {
	console.log('Server started at: ' + server.info.uri);
});
