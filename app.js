// Moduler
var Hapi = require('hapi'); // som import för java
var Basic = require('hapi-auth-basic');
var Path = require('path');
var Good = require('good');
var Bcrypt = require('bcrypt');
var port = 3000;
// Server/Hapi inställningar
var server = new Hapi.Server('localhost', port, { files: { relativeTo: Path.join(__dirname, 'public') } } ); // Skapar en server som "lyssnar" på port 3000

// Skapar ett test object för att kolla validate
var users = {
    john: {
        username: 'john',
        password: 'ok',   // 'secret'
        name: 'John Doe',
        id: '2133d32a'
    }
};

/*var validate = function (username, password, callback) {
    var user = users[username];
    if (!user) {
        return callback(null, false);
    }

    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, { id: user.id, name: user.name });
    });
};

server.pack.register(Basic, function (err) {
    server.auth.strategy('simple', 'basic', { validateFunc: validate });
});*/

// Add the server routes
//server.route(require('./server/routes')); //använder sen
server.route({
    method: 'GET',
    path: '/',
    /*config: { auth: 'simple' },*/
    handler: function (request, reply) {
        reply.file('views/index.html');
    }
});

server.route({
    method: 'GET',
    path: '/admin',
    handler: function (request, reply) {
        reply.file('views/admin.html');
    }
});

server.route({
    method: 'GET',
    path: '/anstalld',
    handler: function (request, reply) {
        reply.file('views/anstalld.html');
    }
});

server.route({
    method: 'GET',
    path: '/frameworks',
    handler: function (request, reply) {
        reply.file('views/frameworks.html');
    }
});

server.route({
    method: 'GET',
    path: '/KundInfo',
    handler: function (request, reply) {
        reply.file('views/KundInfo.html');
    }
});

server.route({
    method: 'GET',
    path: '/SeRapporter',
    handler: function (request, reply) {
        reply.file('views/SeRapporter.html');
    }
});
server.route({
    method: 'GET',
    path: '/Skapaanvandare',
    handler: function (request, reply) {
        reply.file('views/skapavandare.html');
    }
});

var options = {
    opsInterval: 1000,
    reporters: [{
        reporter: require('good-console'),
        args:[{ log: '*', request: '*' }]
    }, {
        reporter: require('good-file'),
        args: ['./test/fixtures/awesome_log', { ops: '*' }]
    }, {
        reporter: require('good-http'),
        args: ['http://prod.logs:3000', { error: '*' } , {
            threshold: 20,
            wreck: {
                headers: { 'x-api-key' : 12345 }
            }
        }]
    }]
};

server.pack.register({
    plugin: require('good'),
    options: options
}, function (err) {

   if (err) {
      console.log(err);
      return;
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
