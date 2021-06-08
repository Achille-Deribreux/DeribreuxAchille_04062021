const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');
const sauceCtrl = require('../controllers/sauce');

router.post('/sauces', multer, sauceCtrl.createSauce);

router.get('/sauces',sauceCtrl.displaySauces);

  module.exports = router;