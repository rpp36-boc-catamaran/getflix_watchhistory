const express = require('express')
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get(`/`, (req, res) => {
  res.send('Welcome to the profile page!')
})

app.get(`/profile`, (req, res) => {
  // console.log('req here: ', req)

  let userId = 1;
  db.getHistory(userId)
  .then((data) => {
    let historyList = [];
    for (let i = 0; i < data.rows.length; i++) {
      historyList.push(data.rows[i]['movie_id'])
    }
    res.status(200).send(historyList);
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

app.post('/main', (req, res) => {
  // console.log('here: ', req.body);
  const userId = req.body.user_id;
  const movieId = req.body.movie_id;;

  db.postHistory(userId, movieId)
  .then(() => {
    res.status(201).send('Success post history data');
  })
  .catch(err => {
    res.status(400).send(err);
  })
})

module.exports = app;