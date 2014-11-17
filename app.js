// Moduler
var Hapi = require('hapi'); // som import för java
// Server/Hapi inställningar
var port = 3000;
var server = new Hapi.Server(port); // Skapar en server som "lyssnar" på port 3000

/**
 * Startar servern
 * För att starta servern lär ni skriva node app.js i consolen och vara i rätt folder
 */
server.start(function () {
    console.log('Server running at:', server.info.uri);
});


// läs mer på http://hapijs.com/tutorials
