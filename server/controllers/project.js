var Project = require('../models/Project');

/**
 * Post projektet.
 * Validerar de inputs som känns nödvängiga.
 * Lägger sen till allt input till ett object somm skickas till databasen om de inte redan finns ett.
 * @param name
 * @param private
 * @param firstName1
 * @param personalCode1
 * @param lastName1
 * @param firstName2
 * @param personalCode2
 * @param lastName2
 * @param adress
 * @param zipCode
 * @param city
 * @param phoneNumber
 * @param cadastral
 * @param rotdeduction
 * @param organizationNumber
 * @param apartmentRental
 * @param email
 */
exports.postProject = function (req, res, next) {
    // Validerar input och skickar felmeddelande.
    req.assert('name', 'Projektet måste ha ett namn.').len(1);
    //req.assert('private', ''); // !!!!!!Lägg till i project object
    //req.assert('firstName1', '');
    //req.assert('personalCode1', '');
    //req.assert('lastName1', '');
    //req.assert('firstName2', '');
    //req.assert('personalCode2', '');
    //req.assert('lastName2', '');
    //req.assert('adress', '');
    //req.assert('zipCode', '');
    //req.assert('city', '');
    //req.assert('phoneNumber', '');
    //req.assert('cadastral', '');
    //req.assert('rotdeduction', '');
    //req.assert('organizationNumber', '');
    //req.assert('apartmentRental', '');
    //req.assert('email', '');

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
        name: req.body.name
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

/**
 * Anställd postar ett jobb som kommer att sparas i ett project.
 * @param project
 * @param workActivities
 * @param busMaterials
 * @param hours
 * @param trips
 * @param date
 */
exports.postJob = function (req, res, next) {
    req.assert('project', '').len(1);
    req.assert('workActivities', 'Du lär skriva vad du gjort.').len(1);
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

    // Letar efter projektet om det finns och isåfall lägger till nya jobbet.
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
  * Retunerar JSON object med alla jobbs från ett projekt.
  * @param projectname
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
  * Retunerar JSON med alla projektnamn.
  * Sorterar även så det äldsta projektet kommer först om det är en 1, tvärtom med -1
  */
 exports.projectNames = function (req, res) {
     Project.find({},
    { name: 1, _id: 0 },
    { sort : { date: 1 } },
    function (err, items) {
         if (err) {
             return (err, null);
         }
         res.json(items);
     });
 };

 /**
  * Retunerar JSON Object med alla project om projektet är aktiverat.
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
 * Retunerar JSON med alla jobb en användare har gjort.
 * @param clickedUser
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
  * Retunerar JSON med alla information om projektet utom alla jobbs som har gjort på det.
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
 * Tar bort projeket
 * @param projectname
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
 * Byter bool värde på enable.
 * Aktiverar/Pausar projekt.
 * @param enable
 */
exports.changeEnable = function (req, res, next) {
    Project.findOneAndUpdate({
        name: req.body.projectName
    }, { $set: { enable: req.body.enable } },
    function(err){
        if (err) return next(err);
    });
};
