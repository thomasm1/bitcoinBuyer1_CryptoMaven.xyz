import express from 'express';   
 
const app= express();
const PORT = process.env.PORT || 5000;
  
app.use(express.static('index')); 


app.listen(PORT, console.log(`App Listening on port  ${PORT}`)); 