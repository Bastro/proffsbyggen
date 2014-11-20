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

/**
 * Skapar servern
 */
var server = new Hapi.Server(config.host, config.port);
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

server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: {
            template: 'index',
            context: {
                title: 'My home page'
            }
        }
    }
});

var assetOptions = {
    development: {
        js: ['js/one.js', 'js/two.js'],
        css: ['../public/lib/font-awesome/css/font-awesome.min.css', 'css/two.css']
    },
    production: {
        js: ['js/scripts.js'],
        css: ['css/styles.css']
    }
}

server.pack.register({
    register: require('hapi-assets'),
    options: assetOptions
 }, function (err) {

     if (err) {
         console.log('Failed loading plugin');
     }
 });

/**
 * Startar servern
 */
server.start(function() {
    console.log('Server started at: ' + server.info.uri);
});
