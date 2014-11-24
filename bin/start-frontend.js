/**
 * Skapar denna filen för att bara få igen routingen på server och tilldelningen till servern.
 * Det görs för att kunna testa så allt funkar för dem som håller på med designen och så på hemsida,
 * om det skulle vara så att orginal startup filen innehåller error under development.
 */

/**
 * Moduler
 * require är som import för java, den hämtar ett packet som vi har installerat
 */
var Hapi = require('hapi');
var Path = require('path');
var config = require('../server/config/config'); // Skapat egen Fil med alla config inställningar
var routes = require('../server/config/routes');

/**
 * Skapar servern
 */
var server = new Hapi.Server(config.host, process.env.PORT || 5000);
module.exports = server;

// Add the server routes
//server.route(require('../server/config/routes'));
/*
 * Konfigurerar servern
 */

server.views({
    engines: {
        html: require('swig')
    },
    path: Path.join(__dirname, '../public/views')
});

module.exports = server;

// Får tag i alla static filer. Css, JS etc.
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'public'
        }
    }
});

server.route(routes);

/**
 * Startar servern
 */
server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});
