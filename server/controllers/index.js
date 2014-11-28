/**
 * GET /
 * Home page.
 */
exports.index = function(req, res) {
    res.render('index', {
        title: 'Proffsbyggen login'
    });
};
/**
 * GET /admin
 * Admin page.
 */
exports.admin = function(req, res) {
    res.render('admin', {
        title: 'Proffsbyggen admin'
    });
};

exports.skapaanvandare = function(req, res) {
    res.render('skapaanvandare', {
        title: 'Proffsbyggen skapa användare'
    });
};

exports.kundinfo = function(req, res) {
    res.render('kundinfo', {
        title: 'Proffsbyggen kund'
    });
};

exports.anstalld = function(req, res) {
    res.render('anstalld', {
        title: 'Proffsbyggen anställd'
    });
};
