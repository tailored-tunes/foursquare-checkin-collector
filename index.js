'use strict';

var Hapi = require('hapi'),
	server = new Hapi.Server(),
	publisher = null,
	queue = require('./app/lib/queue.js')(publisher),
	handler = require('./app/checkin-parser.js')(queue);

server.connection({
  port: 8000+process.env.NODE_APP_INSTANCE,
  routes: {
    cors: true
  }
});

require('./app/checkin-route.js')(server, handler);

server.start(function (err) {
    console.log('Server started at: ' + server.info.uri);
});