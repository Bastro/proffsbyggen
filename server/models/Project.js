var mongoose = require('mongoose');

/**
 * Project Schema
 *
 */
var projectSchema = new mongoose.Schema({
    name: String,
    private: {
        type: Boolean,
        default: false
    },
    customer: [{
        firstName: String,
        lastName: String,
        personalCode: String,
        email: String
    }],
    adress: {
        adress: String,
        zipCode: Number,
        city: String,
        phoneNumber: String,
        cadastral: String, // Fastighetsbeteckning
        rotdeduction: String,
        organizationNumber: String,
        apartmentRental: Number // Lägenhetsnummer
    },

    jobs: [{
        username: String,
        workActivites: String,
        busMaterials: String,
        hours: String,
        trips: String,
        date: String
    }]
});

module.exports = mongoose.model('Project', projectSchema);
