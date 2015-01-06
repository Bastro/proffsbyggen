var _ = require('lodash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/User');
var secrets = require('./secrets');

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

/**
 * Login in med username och password
 * Använder userschema för att söka användare i databasen
 */
passport.use(new LocalStrategy({
    usernameField: 'username'
}, function (username, password, done) {
    User.findOne({
        username: username
    }, function (err, user) {
        if (!user) return done(null, false, {
            message: 'Username ' + username + ' not found'
        });
        user.comparePassword(password, function (err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: 'Invalid email or password.'
                });
            }
        });
    });
}));

/**
 * Login middleware.
 * Kan kolla om användare är inloggade eller inte i alla routes
 */
exports.isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/');
};

/**
 * Admin middleware.
 * Kan kolla om användare är admin eller inte
 */
exports.isAdministrator = function (req, res, next) {
    // Kollar så användaren är inloggade först
    if (req.isAuthenticated()) {
        if (req.user.type !== 'admin') {
            req.flash('error', {
                msg: 'Du måste vara admin för att komma åt den här sidan.'
            });
            return res.redirect('/anstalld');
        } else {
            return next();
        }
    } else {
        req.flash('error', {
            msg: 'Du måste vara inloggad för att komma åt den här sidan.'
        });
        res.redirect('/');
    }
};
