// Moduler
var Hapi = require('hapi'); // som import för java
var Path = require('path');
// Server/Hapi inställningar
var port = 3000;
var server = new Hapi.Server('localhost', port, { files: { relativeTo: Path.join(__dirname, 'public') } }); // Skapar en server som "lyssnar" på port 3000


// Add the server routes
//server.route(require('./server/routes')); //använder sen
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file('views/index.html');
    }
});
/**
 * Startar servern
 * För att starta servern lär ni skriva node app.js i consolen och vara i rätt folder
 */
server.start(function () {
    console.log('Server running at:', server.info.uri);
});

// läs mer på http://hapijs.com/tutorials
