/**
 * Moduler som behövs för att köra filen, ungifär som import för Java.
 * För att kunna använda alla moduler lär man installera dem via Node's package manager npm
 * Det gör man genom att skriva npm install i konsolen, så kmr allt installeras lokalt i mappen node_modulules
 * Anlededningen till att det inte behövs installera alla moduler i taget är för att vi specificerat alla moduler
 * i filen package.json
 * Alla moduler kan man hitta på https://www.npmjs.org/
 */
// Express 4.x moduler                                  // Docs/Api/Website
var express = require('express');                       // http://expressjs.com
var cookieParser = require('cookie-parser');            // https://github.com/expressjs/cookie-parser // kolla så den verkligen behövs
var compress = require('compression');                  // https://github.com/expressjs/compression
var session = require('express-session');               // https://github.com/expressjs/session // kolla så den verkligen behövs
var bodyParser = require('body-parser');                // https://github.com/expressjs/body-parser
var logger = require('morgan');                         // https://github.com/expressjs/morgan
var errorHandler = require('errorhandler');             // https://github.com/expressjs/errorhandler // används i dev miljö
var methodOverride = require('method-override');        // https://github.com/expressjs/method-override // kolla
// Ytterligare moduler                                  ----------------------------------------------------------
var _ = require('lodash');                              // https://lodash.com // kolla
var MongoStore = require('connect-mongo')(session);     // https://github.com/kcbanner/connect-mongo
var flash = require('express-flash');                   // https://github.com/RGBboy/express-flash // kolla
var path = require('path');                             // http://nodejs.org/api/path.html // kolla
var mongoose = require('mongoose');                     // http://mongoosejs.com
var passport = require('passport');                     // http://passportjs.org/
var expressValidator = require('express-validator');    // https://github.com/ctavan/express-validator // kolla
var swig = require('swig');                             // http://paularmstrong.github.io/swig/
var config = require('./server/config/config');
//var helmet = require('helmet');


/**
 * Inkluderar alla kontrollers, servern kommer använda sig av MVC design (Model, View, Controller)
 */
var homeController = require('./server/controllers/home');
var userController = require('./server/controllers/user');
var projectController = require('./server/controllers/project');

/**
 * Konfiguration filer
 * Skriv mer sen
 */
var secrets = require('./server/config/secrets');
var passportConf = require('./server/config/passport');

/**
 * Skapar en Express server.
 * Express är ett webb framework som hanterar tillexempel HTTP och routing bland annat.
 * I Express kan man använda middleware så alla request och response går igenom innan man skickar eller tar emot data,
 * man använder middleware genom methoden use på express server. Vilket i det här fallet ser ut såhär "app.use()".
 */
var app = express();

/*
 * Används för att visa tid i html/view
 * locals är globala variabler i http/view
 */
app.locals.moment = require('moment');

/**
 * Anslutar till databasen.
 * Servern använder sig utav MongoDB, Mongoose används för att kommunicera
 * med MongoDB på en mer abstract nivå.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function () {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

/**
 * Express konfiguration.
 */
app.set('port', config.port);
// Templete engine, används för att kunna visa databas datan på hemsida.
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'public/views'));
// Använder compress så alla publika filer blir komprimerad med gzip.
// Det används så sidan blir snabbare.
app.use(compress());
// Logger information om vad som händer på servern i consolen
app.use(logger('dev'));
// bodyParser så html's forms data blir till json object.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// expressValidator validerar all data som kommer från klienten via html form
app.use(expressValidator()); // måste vara pricis under bodyParser
// Om man ska använda PUT och DELETE headers med http
app.use(methodOverride());
// * Behövs de använda CookieParse??
app.use(cookieParser());
// Skapar session för alla användare på sidan och sparar de i databasen med hjälp av MongoStore
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: secrets.sessionSecret,
    store: new MongoStore({
        url: secrets.db,
        auto_reconnect: true
    })
}));

// Security Settings
//app.disable('x-powered-by');          // Don't advertise our server type
//app.use(csrf());                      // Prevent Cross-Site Request Forgery
/*app.use(helmet.crossdomain());        // Serve crossdomain.xml policy
app.use(helmet.ienoopen());           // X-Download-Options for IE8+
app.use(helmet.nosniff());            // Sets X-Content-Type-Options to nosniff
app.use(helmet.xssFilter());          // sets the X-XSS-Protection header
app.use(helmet.frameguard('deny'));   // Prevent iframe clickjacking*/


// Content Security Policy:
//   http://content-security-policy.com/
//   http://www.html5rocks.com/en/tutorials/security/content-security-policy/
//   http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
//
//   NOTE: TURN THIS OFF DURING DEVELOPMENT
//   IT'S JUST PAINFUL OTHERWISE! OR DON'T
//   EVEN USE IT AT ALL - I JUST WANTED TO
//   LEARN HOW IT WORKS. :)
/*
app.use(helmet.contentSecurityPolicy({
  defaultSrc: [
    "'self'"
  ],
  scriptSrc: [
    "'self'",
    "'unsafe-eval'",
    "'unsafe-inline'",
    'http://foundation-datepicker.peterbeno.com'
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    'http://foundation-datepicker.peterbeno.com'
  ],
  fontSrc: [
    "'self'",
    'http://fonts.googleapis.com',
    'https://fonts.googleapis.com'
  ],
  imgSrc: [
    "'self'"
  ],
  mediaSrc: [
    "'self'"
  ],
  connectSrc: [ // limit the origins (via XHR, WebSockets, and EventSource)
    "'self'",
    'ws://localhost:3000',
    'ws://188.166.59.59:3000/',
    'wss://188.166.59.59:3000/'
  ],
  objectSrc: [  // allows control over Flash and other plugins
    "'none'"
  ],
  frameSrc: [   // origins that can be embedded as frames

  ],
  sandbox: [
    'allow-same-origin',
    'allow-forms',
    'allow-scripts'
  ],
  reportOnly: false,     // set to true if you *only* want to report errors
  setAllHeaders: false   // set to true if you want to set all headers
}));*/

// Använder modulen Passport.js för att sköta logins
app.use(passport.initialize());
app.use(passport.session());
// flash används för att ge feedback till användaren genom meddelanden
app.use(flash());
/*
app.use(function (req, res, next) {
    // CSRF protection.
    if (_.contains(csrfExclude, req.path)) return next();
    csrf(req, res, next);
});*/
// Gör så *alla* sidor kan använda user objectet i view och response/request
app.use(function (req, res, next) {
    // Gör user global för sidorna
    res.locals.user = req.user;
    // Går vidare till nästa middleware
    next();
});

// I Test miljö
app.set('view cache', false);
swig.setDefaults({ cache: false });

// Tid i millesekunder
var minute = 1000 * 60;   //     60000
var hour = (minute * 60); //   3600000
var day  = (hour * 24);   //  86400000
var week = (day * 7);     // 604800000


// Path till alla static filer
/*app.use(express.static(path.join(__dirname, 'public'), {
    maxAge: 31557600000
}));*/
// Gör så alla sidor har tillgång till allt i public
app.use(express.static(__dirname + '/public', { maxAge: week }));

/**
 * Routes.
 */
// Tillgänglig för alla
app.get('/', userController.getLogin);
app.post('/', userController.postLogin);
app.get('/logout', userController.logout);

// Tillgänglig för inloggade
app.get('/anstalld', passportConf.isAuthenticated, homeController.anstalld);
app.get('/nyttlosenord', passportConf.isAuthenticated, homeController.nyttLosenord);
app.get('/projectnamesenable', passportConf.isAuthenticated, projectController.projectNamesEnable);
app.post('/anstalld', passportConf.isAuthenticated, projectController.postJob);

// Tillgänglig admin
app.get('/nyanvandare', userController.getSignup);
app.post('/nyanvandare', userController.postSignup);
app.delete('/deleteuser/:username', passportConf.isAdministrator, passportConf.isAuthenticated, userController.postDeleteAccount);
app.post('/nyttlosenord', passportConf.isAdministrator, passportConf.isAuthenticated, userController.postUpdatePassword);
app.get('/accountlistexceptuser', passportConf.isAdministrator, passportConf.isAuthenticated, userController.accountListExceptUser);

app.get('/admin', passportConf.isAdministrator, passportConf.isAuthenticated, homeController.admin);
app.get('/kundform', passportConf.isAdministrator, passportConf.isAuthenticated, passportConf.isAdministrator, homeController.kundForm);
app.get('/projekt', passportConf.isAdministrator, passportConf.isAuthenticated, homeController.projekt);
app.get('/visaproject', passportConf.isAdministrator, passportConf.isAuthenticated, homeController.visaProject);

app.post('/kundform', passportConf.isAdministrator, passportConf.isAuthenticated, passportConf.isAdministrator, projectController.postProject);
app.get('/projectlist/:projectname', passportConf.isAdministrator, passportConf.isAuthenticated, projectController.projectList);
app.get('/projectnames', passportConf.isAdministrator, passportConf.isAuthenticated, projectController.projectNames);
app.get('/projectnamesenable', passportConf.isAdministrator, passportConf.isAuthenticated, projectController.projectNamesEnable);
app.get('/projectuserjobs', passportConf.isAdministrator, passportConf.isAuthenticated, projectController.projectUserJobs);
app.get('/projectsinfo', passportConf.isAdministrator, passportConf.isAuthenticated, projectController.projectsInfo);
app.delete('/deleteproject/:projectname', passportConf.isAdministrator, passportConf.isAuthenticated, projectController.postDeleteProject);
app.post('/projectchangeenable', passportConf.isAdministrator, passportConf.isAuthenticated, projectController.changeEnable);

app.get('/anvandare', passportConf.isAdministrator, passportConf.isAuthenticated, homeController.accounts);
app.get('/accountlist', passportConf.isAdministrator, passportConf.isAuthenticated, userController.accountlist);

/**
 * 500 Error Handler.
 * Används bara i dev miljö
 * Fixa till det seny
 */
app.use(errorHandler());
//if (process.env.NODE_ENV === 'development') {

/**
 * Start Express server.
 */
app.listen(app.get('port'), function () {
    console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});
// Exporterar app, så servern kan användas för test och i andra filer.
module.exports = app;
