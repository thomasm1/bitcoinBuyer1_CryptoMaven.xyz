 
import express from 'express';   
 
const app= express();
const PORT = process.env.PORT || 5000;
  
app.use(express.static('index')); 


app.get('/api', (req,res) => {
    res.json('welcome to CryptoMaven')
})

app.listen(PORT, () => setTimeout(function() {console.log("hello")}, 5000)); 