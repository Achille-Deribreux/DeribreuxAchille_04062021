//Imports
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

//Schema
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true}
});

//Unique validator, pour être sur que l'adresse mail soit bien unique dans la db
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
