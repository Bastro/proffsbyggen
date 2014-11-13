// Moduler
var Hapi = require('hapi');
// Server/Hapi inställningar
var port = 3000;
var server = new Hapi.Server(port); // Skapar en server som "lyssnar" på port 3000

/**
 * Startar servern
 */
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
