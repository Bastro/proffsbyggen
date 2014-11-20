module.exports = function(server) {
    //var controller = require(/controllers');

    var routeTable = [
        {
            method: 'GET',
            path: '/',
            handler: function(request, reply){
                reply.file('views/index.html');
            }
        }
    ];
    /*first: {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply.file('views/index.html');
            }
        },
    admin: {
            method: 'GET',
            path: '/admin',
            handler: function (request, reply) {
                reply.file('views/admin.html');
            }
        },
    anstalld: {
            method: 'GET',
            path: '/anstalld',
            handler: function (request, reply) {
                reply.file('views/anstalld.html');
            }
        },
    kundinfo: {
            method: 'GET',
            path: '/kundinfo',
            handler: function (request, reply) {
                reply.file('views/KundInfo.html');
            }
        },
    rapporter: {
            method: 'GET',
            path: '/rapporter',
            handler: function (request, reply) {
                reply.file('views/SeRapporter.html');
            }
        },
    skapaanvandare: {
            method: 'GET',
            path: '/skapaanvandare',
            handler: function (request, reply) {
                reply.file('views/skapavandare.html');
            }
        }*/
    return routeTable;
}
