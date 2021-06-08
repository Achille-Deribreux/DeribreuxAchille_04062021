const Sauce = require('../models/sauce');

exports.createSauce = (req,res,next) => {
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
  };

exports.displaySauces = (req,res,next)=>{
    Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
  };