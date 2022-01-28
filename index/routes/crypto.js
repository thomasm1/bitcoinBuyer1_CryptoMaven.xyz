const express = require(express);
const router = express.Router();
const db = require('../config/database');
const Crypto = require('../models/Crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', (req, res) => 
Crypto.findAll()
.then(cr => res.render('crypto', {
    cr
}))
.catch(err => res.render('error', {error: err})));

module.exports = router;