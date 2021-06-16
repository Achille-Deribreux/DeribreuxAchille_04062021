//Imports
const express = require('express');//Importe express
const mongoose = require('mongoose'); 
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

// Set une limite de req par IP dans un temps donné
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

//Connection à mongoDB
mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PWD+'@'+process.env.DB_ADRESS,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();//crée une app express
  
  //Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use(express.json()); //remplace body parser

app.use( mongoSanitize({replaceWith: '_',}),); //Remplace les caractères non autorisés par '_' pour éviter les injections mongoDB

//Redirige vers le fichier userRoutes si /api/auth 
app.use('/api/auth', userRoutes)

//Redirige vers le fichier sauceRoutes si /api/sauces
app.use('/api/sauces', sauceRoutes);


app.use('/images', express.static(path.join(__dirname, 'images')));

//Use le package helmet
app.use(helmet());

//Use le package rateLimit
app.use(limiter);


module.exports = app;//exporte l'application pour pourvoir l'utiliser depuis les autres fichiers tels que le serveur node