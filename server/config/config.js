'use strict';

/**
 * Moduler
 */
var pkg = require('../../package.json');

var config = {};

config.port = process.env.PORT || 3000;

// Exporterar config object så andra filer kan använda
module.exports = config;
