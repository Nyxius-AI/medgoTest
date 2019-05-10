const express = require('express');
const app = express();
const port = process.env.PORT || 9000;
const bodyParser = require('body-parser')

// const MailSchema = require('./models/email.model')
const mongo = require('mongoose');
const dburl = 'mongodb://localhost:27017/mail'

// Middleware

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

//Models

//Route setup
app.get('/', (req, res) => {
  res.send('<h1> Home </h1>');
})

// Handle post mail
app.post('/sendMail', (req,res) => {
    
  mongo.connect(dburl, {useNewUrlParser: true},  (err, db) => {
    if (err) throw err;  

    db.collection('mail').insertOne({...req.body, date: Date.now()}, err => {
      if (err) throw err
      res.send("email sucessfully saved")
    })

    db.close()
  })

  console.log('mail saved')
})


//Start server
app.listen(port, (req, res) => {
    console.log(`server listening on port: ${port}`)
 });


// Initialise mongo database
mongo.connect(dburl, {useNewUrlParser: true},  (err, db) => {
    if (err) throw err;
    console.log("DB created")
    
    db.createCollection('mail', (err) => {
        if (err) throw err;
        console.log("Collection created!");
    })

    db.close()
})