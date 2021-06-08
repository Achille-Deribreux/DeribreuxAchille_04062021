const express = require('express');//Importe express
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const path = require('path');
const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Achille_Deribreux:Achille-11032@cluster0.ft4m9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


  const app = express();//crée une app express
  app.use((req, res, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      next();
    });
  
  app.use(express.json());

  app.use('/images', express.static(path.join(__dirname, 'images')));
  //créer un user --OK sauf pas de réponse d'affichage

//
app.use('/api/auth', userRoutes)
app.use('/api/sauces', sauceRoutes);
module.exports = app;//exporte l'application pour pourvoir l'utiliser depuis les autres fichiers tels que le serveur node