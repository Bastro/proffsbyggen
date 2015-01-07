/**
 * Main Controller
 * Här ligger alla "kontrollers" som endast redanar view och byter title på sidan
 */
exports.admin = function (req, res) {
    res.render('admin', {
        title: 'Home'
    });
};

exports.kundForm = function (req, res) {
    res.render('kundform', {
        title: 'kundform'
    });
};

exports.anstalld = function (req, res) {
    res.render('anstalld', {
        title: 'anstalld'
    });
};

exports.projekt = function (req, res) {
    res.render('projekt', {
       title: 'projekt'
    });
};

exports.nyttLosenord = function (req, res) {
    res.render('nyttlosenord', {
        title: 'nytt lösenord'
    });
};

exports.visaProject = function (req, res) {
    res.render('visaproject', {
        title: 'nytt lösenord'
    });
};

exports.accounts = function (req, res) {
    res.render('anvandare', {
        title: 'använder'
    });
};
