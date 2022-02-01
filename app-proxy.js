const express = require('express'); 
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); 
const path = require('path');

// Database
const db = require('./index/config/database');

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