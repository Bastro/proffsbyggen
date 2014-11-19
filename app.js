// Moduler
var Hapi = require('hapi'); // som import för java
var Basic = require('hapi-auth-basic');
var Path = require('path');
// var Bcrypt = require('bcrypt'); lägg till sen
var port = 3000;
// Server/Hapi inställningar
var server = new Hapi.Server('localhost', port, { files: { relativeTo: Path.join(__dirname, 'public') } }); // Skapar en server som "lyssnar" på port 3000

// Skapar ett test object för att kolla validate
var users = {
    john: {
        username: 'john',
        password: '$2a$10$iqJSHD.BGr0E2IxQwYgJmeP3NvhPrXAeLSaGCj6IR/XU5QtjVu5Tm',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};


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
