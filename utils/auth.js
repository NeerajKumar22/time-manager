// files require...

var jwt = require("jsonwebtoken");

var User = require("../models/User")

// Export the generated token with user id and secret key with payload...
// if err then return err or null 
//return null or token.... 

exports.generateJWT = (user, cb) => {
    jwt.sign({userId : user.id}, process.env.SECRET,(err, token) => {
        if(err) return cb(err, null);
        return cb(null, token);
    })
}

// Export the verified token 
// if token is present then token and secret key and payload....
// find user by id(and decode that hash key)

// else response message Token required....

exports.verifyToken = (req, res, next) => {
    var token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            User.findById(decoded.userId, (err, user) => {
                req.user = user;
                next();
            })
        })
    }else{
        res.json({error: "Token required...."})
    }
}