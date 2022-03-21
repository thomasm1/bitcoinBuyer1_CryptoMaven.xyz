// crypto routing table for user later 

import  express from express;
const router = express.Router();

import Crypto from '../index/models/Crypto';  // for MySQL Sequelize table later
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op; 

router.get('/', (req, res) => 
Crypto.findAll()
.then(cr => res.render('crypto', {
    cr
}))
.catch(err => res.render('error', {error: err})));

router.get('/home', (req, res) => 
InputStream.findAll()
.then(_input => res.render('_input', {
    _input
}))
.catch(err=> res.render('error', {error: err})));

module.exports = router;