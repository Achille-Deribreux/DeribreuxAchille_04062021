//Import
const mongoose = require('mongoose');

//Création du modèle
const sauceSchema = mongoose.Schema({
    userId : {type : String},
    name : {type : String},
    manufacturer: {type : String},
    description: {type : String},
    mainPepper: {type : String},
    imageUrl: {type : String},
    heat: {type : Number},
    likes: {type : Number},
    dislikes: {type : Number},
    usersLiked: {type : Array},
    usersDisliked: {type : Array},
    });

//Export
module.exports = mongoose.model('Sauce', sauceSchema);