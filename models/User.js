// import the require file and packages....

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var bcrypt = require("bcrypt")

// Details required of user 

var userSchema = new Schema({
    name : {
        type : String,
        required : [
            true,
            "Name is required",
        ]
    },

    email : {
        type : String,
        required : [
            true,
            "Email is required",
        ],
        unique : true,
    },

    password : {
        type : String,
        required : [
            true,
            "Password is required",
        ],
        minlength : 6,
        maxlength : 12,
    },


}, {timestamps : true});

//

userSchema.pre("save", function(next){
    if(!this.isModified('password')) return next

    this.password = bcrypt.hashSync(this.password, 10);

    // call next

    next()
})

// Compare password using bcrypt.compareSync....

userSchema.methods.validatePassword = function(password){
    return bcrypt.compareSync(password, this.password);
} 

// Module exports.....

module.exports = mongoose.model("User", userSchema);