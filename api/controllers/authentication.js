var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {"error": "required fields is empty"}); 
        return;
    }
   
    var user = new User();
    user.email = req.body.email;
    user.name = req.body.name;
    user.setPasword(req.body.password);
    user.save(function(err){
        if (err) { 
            sendJSONresponse(res, 400, {"error": err.message});
        }
        else { 
            sendJSONresponse(res, 200, {"response": "user saved"});
        }
    }
    );
};

module.exports.authentication = function(req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, {"error": "required fields is empty"}); 
        return;
    }
   
    User.findOne({email: req.body.email}, function (err, user) {
        if (err) { 
            sendJSONresponse(res, 400, {"error": err.message});
        } else if (!user)  {
            sendJSONresponse(res, 400, {"error": "incorrect user name"}); 
        } else if (!user.validPassword(req.body.password)) {
            sendJSONresponse(res, 400, {"error": "incorrect password"});  
        } else {
            sendJSONresponse(res, 200, user);
        }     
    }
    );
};