const express = require('express'); 
 
const path = require('path');

const app= express();
const port = '5000';

// app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname + '/public/index.html'));
    // res.sendFile(path.join(__dirname + '/index.html'), {root: __dirname});
// });

app.use(express.static('public'));
 

app.listen(port, () => {
    console.log('App Listening on port '+ port)
});