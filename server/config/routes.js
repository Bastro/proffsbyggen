var Joi = require('joi');

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
    },
    {
        method: 'POST',
        path: '/SkapaAnvandare',
        config: {
            validate: {
                payload: {
                    user: Joi.string().token().required(),
                    email: Joi.string().email().required(),
                    password: Joi.string().required()
                }
            },

        },
        handler: function (request, reply) {

            var Account = request.server.plugins.models.Account;
            var User = request.server.plugins.models.User;
            var Session = request.server.plugins.models.Session;

            async.auto({
                user: function (done) {

                    var username = request.payload.username;
                    var password = request.payload.password;
                    var email = request.payload.email;

                    User.create(username, password, email, done);
                },
                account: ['user', function (done, results) {

                    var name = request.payload.name;

                    Account.create(name, done);
                }],
                linkUser: ['account', function (done, results) {

                    var id = results.account._id.toString();
                    var update = {
                        $set: {
                            user: {
                                id: results.user._id.toString(),
                                name: results.user.username
                            }
                        }
                    };

                    Account.findByIdAndUpdate(id, update, done);
                }],
                linkAccount: ['account', function (done, results) {

                    var id = results.user._id.toString();
                    var update = {
                        $set: {
                            roles: {
                                account: {
                                    id: results.account._id.toString(),
                                    name: results.account.name.first + ' ' + results.account.name.last
                                }
                            }
                        }
                    };

                    User.findByIdAndUpdate(id, update, done);
                }],
                welcome: ['linkUser', 'linkAccount', function (done, results) {

                    var options = {
                        subject: 'Your ' + config.get('/projectName')    + ' account',
                        to: {
                            name: request.payload.name,
                            address: request.payload.email
                        }
                    };
                    var template = 'welcome';

                    mailer.sendEmail(options, template, request.payload, done);
                }],
                session: ['welcome', function (done, results) {

                    Session.create(request.payload.username, done);
                }]
            }, function (err, results) {

                if (err) {
                    return reply(err);
                }

                var user = results.linkAccount[0];
                var credentials = user.username + ':' + results.session.key;
                var authHeader = 'Basic ' + new Buffer(credentials).toString('base64');

                reply({
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        roles: user.roles
                    },
                    session: results.session,
                    authHeader: authHeader
                });
            });
        }
    }
];
