//Imports
const express = require('express');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');
const sauceCtrl = require('../controllers/sauce');

//Création d'un router
const router = express.Router();

//Routes
router.post('/:id/like', auth, sauceCtrl.like);

router.post('/', auth, multer, sauceCtrl.createSauce);

router.get('/', auth, sauceCtrl.displaySauces);

router.get('/:id', auth, sauceCtrl.displaySauce);

router.put('/:id',auth, multer,sauceCtrl.modifySauce);

router.delete('/:id',auth,  sauceCtrl.deleteSauce);

//Export
module.exports = router;