// ta bort async och lodash från list??
var Project = require('../models/Project');

/**
 * Kolla och fixa kommentar sen
 */
exports.postProject = function (req, res, next) {
    req.assert('name', ''); // Måste ha en längd :DD
    req.assert('private', ''); // Lägg till i project object
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
        return res.redirect('/kundform');
    }

    var project = new Project({
        name: req.body.name,
        enable: false,
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
        name: req.body.project
    }, function (err, existingProject) {
        if (existingProject) {
            req.flash('errors', {
                msg: 'Ett project med de här namnet finns redan.'
            });
            return res.redirect('/kundform');
        }
        project.save(function (err) {
            if (err) return next(err);
            req.flash('success', {
                msg: 'Projectet skapades.'
            });
            return res.redirect('/kundform');
        });
    });

};

exports.postJob = function (req, res, next) {
    req.assert('project', '');
    req.assert('workActivities', 'Du lär skriva vad du gjort.').len(1 );
    req.assert('busMaterials', '');
    req.assert('hours', '');
    req.assert('trips', '');
    req.assert('date', '');


    var errors = req.validationErrors();

    if (errors) {
        req.flash('errors', errors);
        return res.redirect('/anstalld');
    }

    var job = {
        username: req.user.username,
        workActivities: req.body.workActivities,
        busMaterials: req.body.busMaterials,
        hours: req.body.hours,
        trips: req.body.trips,
        date: req.body.date
    };

    Project.findOneAndUpdate({
        name: req.body.project
    }, { $push: { jobs: job } },
    function(err){
        if (err) {
            req.flash('errors', {
                msg: 'Det blev något fel.'
            });
            return next(err);
        } else {
             req.flash('success', {
                msg: 'Jobbet lades till.'
            });
            return res.redirect('/anstalld');
        }
    });
};

 /**
  * GET /projectlist
  * JSON accounts api
  */
 exports.projectList = function (req, res) {
     Project.findOne({
        name: req.params.projectname
     }, { jobs: 1, _id: 0},
    function (err, items) {
         if (err) {
             return (err, null);
         }
         res.json(items);
     });
 };

 /**
  * GET /projectnames
  * JSON accounts api
  */
 exports.projectNames = function (req, res) {
     Project.find({},
    { name: 1, _id: 0},
    function (err, items) {
         if (err) {
             return (err, null);
         }
         res.json(items);
     });
 };

 /**
  * GET /projectnames
  * JSON accounts api
  */
 exports.projectNamesEnable = function (req, res) {
     Project.find({ enable: true },
    { name: 1, _id: 0},
    function (err, items) {
         if (err) {
             return (err, null);
         }
         res.json(items);
     });
 };

/**
 *
 */
 exports.projectUserJobs = function (req, res) {
     Project.aggregate([
         // Tar bara med documents som matchar
         {
            $match: {
                'jobs.username': req.query.clickedUser
            }
         },
         // $project har inget och göra med att vi håller på med projects,
         // utan den anvgör vilka fält som ska retuneras
         {
            $project: {
                _id: 0,
                name: 1,
                jobs: 1
            }
         },
         // Kolla mer på :P :P:P :P:PS:DPSD:
         {
            $unwind: '$jobs'
         },
         // Tar bara med elementen som matchar
         {
            $match: {
                'jobs.username': req.query.clickedUser
            }
         },
         // Sorterar alla job efter datum
         {
            $sort: {
                'jobs.date': 1
            }
         }
    ], function (err, items) {
         if (err) {
             return (err, null);
         }
         res.json(items);
     });
 };


 /**
  * GET
  *
  */
 exports.projectsInfo = function (req, res) {
     Project.find({

     }, { jobs: 0, _id: 0},
    function (err, items) {
         if (err) {
             return (err, null);
         }
         res.json(items);
     });
 };

/**
 *
 */
exports.postDeleteProject = function (req, res, next) {
    Project.remove({
        name: req.params.projectname
    }, function (err, result) {
        res.send((result === 1) ? {
            msg: ''
        } : {
            msg: 'error: ' + err
        });
    });
};

/*
 *
 */
exports.changeEnable = function (req, res, next) {
    Project.findOneAndUpdate({
        name: req.body.projectName
    }, { $set: { enable: req.body.enable } },
    function(err){
        if (err) return next(err);
    });
};
