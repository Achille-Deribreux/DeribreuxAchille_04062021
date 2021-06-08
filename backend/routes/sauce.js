const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');
const sauce = require('../models/sauce');

router.post('/', multer, sauceCtrl.createSauce);

router.get('/',sauceCtrl.displaySauces);

router.get('/:id', sauceCtrl.displaySauce);

router.put('/:id',multer,sauceCtrl.modifySauce);

router.delete('/:id', sauceCtrl.deleteSauce);

module.exports = router;