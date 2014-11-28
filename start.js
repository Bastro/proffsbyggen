/**
 * Moduler
 * require är som import för java, den hämtar ett packet som vi har installerat
 */
// Express 4.x moduls
var express = require('express');
var path = require('path');
var swig = require('swig');

var config = require('./server/config/config'); // Skapat egen Fil med alla config inställningar
var mainController = require('./server/controllers/index');

/**
 * Skapar en Express server.
 */
var app = express();

/**
 * Express konfiguration.
 */
app.set('port', process.env.PORT || 3000);
// Templete engine
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
// Serv static files
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Routes
 */
app.get('/', mainController.index);
app.get('/admin', mainController.admin);
app.get('/skapaanvandare', mainController.skapaanvandare);
app.get('/kundinfo', mainController.kundinfo);
app.get('/anstalld', mainController.anstalld);

/**
 * Start Express server.
 */
app.listen(app.get('port'), function() {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
// Exporterar app så alla moduler kan använda den
module.exports = app;
