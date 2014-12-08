/**
 * Main Controller
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
