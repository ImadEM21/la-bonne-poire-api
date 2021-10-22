const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const app = express();

const advertRouter = require('./routes/adverts');
const formRouter = require('./routes/forms');
const userRouter = require('./routes/users');
const offerRouter = require('./routes/offers');

mongoose.connect('mongodb://localhost/labonnepoire')
.then(() => console.log("Connexion à MongoDB réussie"))
.catch(error => {
  console.log("connexion à MongoDB échouée");
  console.log('erreur: ', error)
});


app.use(helmet());
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api', advertRouter);
app.use('/api', formRouter);
app.use('/api', userRouter);
app.use('/api', offerRouter);

module.exports = app;