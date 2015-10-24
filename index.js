'use strict';

var Hapi = require('hapi'),
	server = new Hapi.Server(),
	publisher = require('./app/lib/aws.js')(process.env.SNS_TOPIC, process.env.AWS_REGION, process.env.RETRY_COUNT),
	queue = require('./app/lib/queue.js')(publisher),
	handler = require('./app/checkin-parser.js')(queue),
	port = process.env.NODE_APP_INSTANCE || 0;

server.connection({
  port: 8000+port,
  routes: {
    cors: true
  }
});

require('./app/checkin-route.js')(server, handler);

server.start(function (err) {
    console.log('Server started at: ' + server.info.uri);
});