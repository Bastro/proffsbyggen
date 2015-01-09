var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
var mongoose = require('mongoose');

/**
 * User Schema
 * Hur användaren kommer att sparas i databasen
 */
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    type: {
        type: String,
        default: 'user'
    },
    enable: {
        type: Boolean,
        default: true
    }
});

/**
 * Password hashing middleware.
 * Använder bcrypt för att hasha lösenordet
 */
userSchema.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(5, function (err, salt) {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

/**
 * Method om man ska jämföra lösenord
 * med hjälp av bcrypt
 */
userSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

// Exporterar User Schema för att kunna göra sökningar i databasen på user "listan" i andra filer
module.exports = mongoose.model('User', userSchema);
