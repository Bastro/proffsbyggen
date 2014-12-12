var _ = require('lodash');
var async = require('async');
var Project = require('../models/Project');

exports.postProject = function (req, res, next) {
    req.assert('name', '');
    req.assert('private', '');
    req.assert('firstName1', '');
    req.assert('personalCode1', '');
    req.assert('lastName1', '');
    req.assert('firstName2', '');
    req.assert('personalCode2', '');
    req.assert('lastName2', '');
    req.assert('adress', '');
    req.assert('zipCode', '');
    req.assert('city', '');
    req.assert('phoneNumber', '');
    req.assert('cadastral', '');
    req.assert('rotdeduction', '');
    req.assert('organizationNumber', '');
    req.assert('apartmentRental', '');
    req.assert('email', '');

    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/');
    }

    var project = new Project({
        name: req.body.name,
        private: false,
        customer: [
            {
                firstname: req.body.firstName1,
                lastName: req.body.lastName1,
                personalCode: req.body.personalCode1,
                email: req.body.email
            },
            {
                firstname: req.body.firstName2,
                lastName: req.body.lastName2,
                personalCode: req.body.personalCode2,
                email: req.body.email
            }
        ],
        adress: {
            adress: req.body.adress,
            zipCode: req.body.zipCode,
            city: req.body.city,
            phoneNumber: req.body.phoneNumber,
            cadastral: req.body.cadastral, // Fastighetsbeteckning
            rotdeduction: req.body.rotdeduction,
            organizationNumber: req.body.organizationNumber,
            apartmentRental: req.body.apartmentRental // Lägenhetsnummer
        },
        jobs: []
    });

    Project.findOne({
        username: req.body.project
    }, function (err, existingProject) {
        if (existingProject) {
            req.flash('errors', {
                msg: 'error byt'
            });
            return res.redirect('/');
        }
        project.save(function (err) {
            if (err) return next(err);
            console.log('succes');
        });
    });

};

exports.postJob = function (req, res, next) {
    req.assert('project', '');
    req.assert('workActivities', '');
    req.assert('busMaterials', '');
    req.assert('hours', '');
    req.assert('trips', '');
    req.assert('date', '');


    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/');
    }

    var job = {
        username: req.user.username,
        workActivities: req.body.workActivites,
        busMaterials: req.body.busMaterials,
        hours: req.body.hours,
        trips: req.body.trips,
        date: req.body.date
    };


    Project.findOneAndUpdate({
        name: req.body.project
    }, { $push: { jobs: job } } ,function(err){
        if (err) {
            return next(err);
        } else {
            console.log("Successfully added");
        }
    });

};
