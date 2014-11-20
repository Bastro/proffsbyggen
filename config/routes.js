module.exports = function(server) {
    //var controller = require(/controllers');

    // Array of routes for Hapi
    var routeTable = [
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply.file('views/index.html');
            }
        },
        {
            method: 'GET',
            path: '/admin',
            handler: function (request, reply) {
                reply.file('views/admin.html');
            }
        },
        {
            method: 'GET',
            path: '/anstalld',
            handler: function (request, reply) {
                reply.file('views/anstalld.html');
            }
        },
        {
            method: 'GET',
            path: '/frameworks',
            handler: function (request, reply) {
                reply.file('views/frameworks.html');
            }
        },
        {
            method: 'GET',
            path: '/KundInfo',
            handler: function (request, reply) {
                reply.file('views/KundInfo.html');
            }
        },
        {
            method: 'GET',
            path: '/SeRapporter',
            handler: function (request, reply) {
                reply.file('views/SeRapporter.html');
            }
        },
        {
            method: 'GET',
            path: '/Skapaanvandare',
            handler: function (request, reply) {
                reply.file('views/skapavandare.html');
            }
        }
    ];
    return routeTable;
}
