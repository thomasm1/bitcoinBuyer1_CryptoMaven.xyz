const express = require('express'); 
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); 
const path = require('path');

const Sequelize = require('sequelize'); 

// Database
const db = require('./config/database');  // move later
// const db = new Sequelize('dbcryptomaven', 'thomas1', 'password1', { 
//     host: 'localhost',
//     dialect: 'mysql', // 'mysql'|'sqlite'|'postgres'|'mssql',
//     operatorsAliases: false,
//     pool: {
//       max:5,
//       min:0,
//       acquire:30000,
//       idle:10000
//     },
//     //SQLite only (theseus & atlas computers)
//     // storage: '~/db/sqlite/db.sqlite'
// });

// Test DB
db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

const app= express();
const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
    // // res.send('<h2>Node-Express-NGINX Reverse Proxy</h2>);

    // res.sendFile(path.join(__dirname + '/public/index.html'));
    // res.sendFile(path.join(__dirname + '/index.html'), {root: __dirname});
// });
 

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'mavenlanding' }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(express.urlencoded({ extended: false })); 

// app.use(express.static('index'));
app.use(express.static(path.join(__dirname, 'index')));
app.get('/', (req, res) => res.render('index', { layout: 'maven' }));


//ROUTES
app.use('/crypto', require('./routes/crypto'));  


app.listen(PORT, console.log(`App Listening on port  ${PORT}`)); 