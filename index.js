'use strict';

var Hapi = require('hapi'),
	server = new Hapi.Server(),
	publisher,
	queue,
	handler,
	port = process.env.PORT || 8000,
	backend = process.env.BACKEND || 'aws';

if (backend === 'aws') {
	publisher = require('./app/lib/aws.js')(process.env.SNS_TOPIC, process.env.AWS_REGION);
} else {
	publisher = require('./app/lib/nsq.js')(process.env.NSQ_HOST, process.env.NSQ_PORT, process.env.NSQ_TOPIC);
}
queue = require('./app/lib/queue.js')(publisher);
handler = require('./app/checkin-parser.js')(queue);

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
