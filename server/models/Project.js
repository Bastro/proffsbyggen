var mongoose = require('mongoose');

/**
 * Project Schema
 * Hur projectet kommer att sparas i databasen
 */
var projectSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    enable: {
        type: Boolean,
        default: false
    },
    private: {
        type: String,
        default: 'nej'
    },
    rotdeduction: String,
    organizationNumber: String,
    customer: [{
        firstName: String,
        lastName: String,
        personalCode: String,
        email: String
    }],
    adress: {
        adress: String,
        zipCode: String,
        city: String,
        phoneNumber: String,
        cadastral: String, // Fastighetsbeteckning
        apartmentRental: String // Lägenhetsnummer
    },
    jobs: [{
        username: String,
        workActivities: String,
        busMaterials: String,
        hours: String,
        trips: String,
        date: String
    }],
    date : {
        type : Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Project', projectSchema);
