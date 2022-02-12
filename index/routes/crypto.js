const express = require(express);
const router = express.Router();
const db = require('../config/database');
const Crypto = require('../models/Crypto');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const InputStream = require('../models/InputStream');

router.get('/', (req, res) => 
Crypto.findAll()
.then(cr => res.render('crypto', {
    cr
}))
.catch(err => res.render('error', {error: err})));

router.get('/current', (req, res) => 
InputStream.findAll()
.then(_input => res.render('_input', {
    _input
}))
.catch(err=> res.render('error', {error: err})));

module.exports = router;