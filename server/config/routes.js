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
        path: '/kundinfo',
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
