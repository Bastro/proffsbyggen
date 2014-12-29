var crypto = require('crypto');
var passport = require('passport');
var User = require('../models/User');
var secrets = require('../config/secrets');

/**
 * GET
 * Login sida.
 */
exports.getLogin = function (req, res) {
    console.log(req.session.flash);
    // Om användaren redan är inne skickas den till olika sidor beroende på vilken typ av användare de är
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
 * POST
 * Logga in med username och password
 * @param username
 * @param password
 */
exports.postLogin = function (req, res, next) {
    req.assert('username', 'Användarnamnet är inte giltigt.').len(3);
    req.assert('password', 'Lösenordet kan inte vara tomt.').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/');
    }

    passport.authenticate('local', function (err, user, info) {
        if (err) return next(err);
        if (!user) {
            req.flash('errors', {
                msg: 'Användarnamnet eller lösenordet är felstavat.'
            });
            return res.redirect('/');
        }
        req.logIn(user, function (err) {
            if (err) return next(err);
            if (user.type == 'admin') {
                return res.redirect('/admin');
            } else {
                return res.redirect('/anstalld');
            }
        });
    })(req, res, next);
};

/**
 * GET
 * Loggar ut användaren och skickar den till login sidan.
 */
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * GET
 * Render signUp sidan
 */
exports.getSignup = function (req, res) {
    //if (req.user) return res.redirect('/');
    res.render('nyanvandare', {
        title: 'Skapa ny användare'
    });
};

/**
 * POST /login
 * Logga in med username och password
 * @param username
 * @param password
 */
exports.postSignup = function (req, res, next) {
    req.assert('username', 'Användarnamnet måste minst ha 3 tecken.').len(3);
    req.assert('password', 'Lösenordet måste minst ha 4 tecken.').len(4);
    //req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/nyanvandare');
    }

    // Skapar ett user object med datan från form input i html
    var user = new User({
        username: req.body.username,
        password: req.body.password
    });

    User.findOne({
        username: req.body.username
    }, function (err, existingUser) {
        if (existingUser) {
            req.flash('errors', {
                msg: 'Konto med de användarnamnet finns redan.'
            });
            return res.redirect('/nyanvandare');
        }
        user.save(function (err) {
            if (err) return next(err);
            req.flash('success', {
                msg: 'Användare skapades.'
            });
            return res.redirect('/nyanvandare');
        });
    });
};

/**
 * POST
 * Update current password.
 * @param password
 */
exports.postUpdatePassword = function (req, res, next) {
    req.assert('password', 'Lösenordet måste vara minst fyra tecken.').len(4);
    req.assert('confirmPassword', 'Lösenorden matchar inte.').equals(req.body.password);

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/nyttlosenord');
    }

    User.findById(req.user.id, function (err, user) {
        if (err) return next(err);

        user.password = req.body.password;

        user.save(function (err) {
            if (err) return next(err);
            req.flash('success', {
                msg: 'Lösenordet har ändras.'
            });
            res.redirect('/nyttlosenord');
        });
    });
};

/**
 *
 */
exports.postDeleteAccount = function (req, res, next) {
    User.remove({
        username: req.params.username
    }, function (err, result) {
        res.send((result === 1) ? {
            msg: ''
        } : {
            msg: 'error: ' + err
        });
    });
};
