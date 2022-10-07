const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get(`/profile`, (req, res) => {
  res.send('Welcome to the profile page!')
})

module.exports = app;