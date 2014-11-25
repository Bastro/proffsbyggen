//var requireDirectory = require('require-directory');

// Bootstrap your controllers so you dont have to load them individually. This loads them all into the controller name space. https://github.com/troygoode/node-require-directory
//var controller = requireDirectory(module, '../controllers');

module.exports = [
    {
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
    },
     {
        method: 'GET',
        path: '/admin',
        handler: {
            view: {
                template: 'admin',
                context: {
                    title: 'My home page'
                }
            }
        }
    },
     {
        method: 'GET',
        path: '/anstalld',
        handler: {
            view: {
                template: 'anstalld',
                context: {
                    title: 'My home page'
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/index',
        handler: {
            view: {
                template: 'index',
                context: {
                    title: 'My home page'
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/KundInfo',
        handler: {
            view: {
                template: 'kundinfo',
                context: {
                    title: 'My home page'
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/SkapaAnvandare',
        handler: {
            view: {
                template: 'SkapaAnvandare',
                context: {
                    title: 'My home page'
                }
            }
        }
    }


];
