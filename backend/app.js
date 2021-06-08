const express = require('express');//Importe express
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt');
const User = require('./models/user');
const Sauce = require('./models/sauce');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const multer = require('./middleware/multer-config');
const path = require('path');

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
  app.post('/api/auth/signup', (req,res,next)  => {
    //
    bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
  })

  //connecter un user
  app.post('/api/auth/login', (req,res,next)  => {
    User.findOne({email : req.body.email})
        .then(user =>{
            if (!user){
                return res.status(401).json({error : "utilisateur non trouvé !"})
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid=>{
                    if(!valid){
                        return res.status(401).json({error : "mdp incorrect!"})
                    }
                    res.status(200).json({
                        userId : user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                          )
                    });
                })
                .catch(error => res.status(500).json({error}))    
        })
        .catch(error => res.status(500).json({error}));
  })

  app.post('/api/sauces', multer, (req,res,next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${
        req.file.filename
      }`,
      likes: 0,
      dislikes: 0
    })
    sauce
      .save()
      .then(() => res.status(201).json({ message: 'Sauce enregistré !' }))
      .catch((error) => res.status(400).json({ error }))
  });
  app.get('/api/sauces',(req,res,next)=>{
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
  })

module.exports = app;//exporte l'application pour pourvoir l'utiliser depuis les autres fichiers tels que le serveur node