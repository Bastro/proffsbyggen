var _ = require('lodash');
var async = require('async');
var crypto = require('crypto');
var passport = require('passport');
var User = require('../models/User');
var secrets = require('../config/secrets');

/**
 * GET /login
 * Login page.
 */
exports.getLogin = function (req, res) {
    if (req.user) {
        if (req.user.type == 'admin') {
            return res.redirect('/admin');
        } else {
            return res.redirect('/anstalld');
        }
    }
    // fixa lika på post login sen
    res.render('index', {
        title: 'Login'
    });
};

/**
 * POST /login
 * Logga in med username och password
 * @param email
 *
 */
exports.postLogin = function (req, res, next) {
    req.assert('username', 'Username is not valid').len(3);
    req.assert('password', 'Password cannot be blank').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/');
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);
        if (!user) {
            req.flash('errors', {
                msg: info.message
            });
            return res.redirect('/');
        }
        req.logIn(user, function (err) {
            if (err) return next(err);
            req.flash('success', {
                msg: 'Success! You are logged in.'
            });
            res.redirect(req.session.returnTo || '/');
        });
    })(req, res, next);
};

/**
 *
 *
 */
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

/**
 *
 *
 */
exports.getSignup = function (req, res) {
    //if (req.user) return res.redirect('/');
    res.render('nyanvandare', {
        title: 'Skapa ny användare'
    });
};

/**
 *
 */
exports.postSignup = function (req, res, next) {
    req.assert('username', 'Username is not valid').len(3);
    req.assert('password', 'Password must be at least 4 characters long').len(4);
    //req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/nyanvandare');
    }

    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findOne({
        username: req.body.username
    }, function (err, existingUser) {
        if (existingUser) {
            req.flash('errors', {
                msg: 'Account with that username address already exists.'
            });
            return res.redirect('/nyanvandare');
        }
        user.save(function (err) {
            if (err) return next(err);
            req.logIn(user, function (err) {
                if (err) return next(err);
                res.redirect('/anstalld');
            });
        });
    });
};
