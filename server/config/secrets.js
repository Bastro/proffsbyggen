/**
 * Den här filen innehåller hemliga info
 * Pusha inte upp den riktiga information till git när man är i production mode!
 */

module.exports = {

  db: process.env.MONGOLAB_URI || process.env.MONGODB || 'mongodb://localhost:27017/test',

  sessionSecret: process.env.SESSION_SECRET || 'Your Session Secret goes here',

};
