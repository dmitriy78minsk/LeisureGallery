var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var usersSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            unique: true,
            required:  true
        },
        name: {
            type: String, 
            required: true
        },
        hash: String,
        salt: String
    }
    );

    usersSchema.methods.setPasword = function(password) {
        this.salt = crypto.randomBytes(16).toString('hex');
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    };

    usersSchema.methods.validPassword = function(password) {
        return this.hash === crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    };


    mongoose.model('User', usersSchema);
//var User = mongoose.model('User', usersSchema);

//console.log(Users);

// var user = new User();
// user.email = "dima@gmail.com";
// user.name = "dima";
// user.setPasword('test');
// user.save(function(err){
//     if (err) { 
//           console.log('error by save user: ' + err.message); }
//     else { 
//         console.log('user ' + user.email + ' saved');
//      }
// }
// );
    
