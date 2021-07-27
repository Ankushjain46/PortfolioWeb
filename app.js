const express = require('express');
const mongoose = require('mongoose')
const pug = require('pug');
const port = 80;
const app = express();

mongoose.connect('mongodb://localhost/portfolioContact', {useNewUrlParser: true, useUnifiedTopology: true});

const contSchema = new mongoose.Schema({
    name: String,
    email: String,
    subject: String,
    message: String
    
  });

const cont = mongoose.model('cont', contSchema);


app.use('/static' , express.static('static'))

app.set('view engine', 'pug')
app.use(express.urlencoded());

app.get('/index.pug', function (req, res) {
    res.render('index.pug')
  })
 
app.post('/', function (req, res) {
   var myData = new cont(req.body);
        myData.save().then(()=>{
        res.send(`This item has been saved to the database`)
        }).catch(()=>{
        res.status(400).send(`item was not saved to the databse`)
    })
    res.render('index.pug')
    })



app.listen(port, ()=>{
    console.log(`Post is starting on ${port}`)
})




