const express = require('express')
const bodyParser = require('body-parser');
const db = require('../database/index.js');
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get(`/`, (req, res) => {
  res.send('Welcome to the profile page!')
})

app.get(`/profile/gethistory`, (req, res) => {
  let userId = req.body.userId;

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

app.post('/main/updatehistory', (req, res) => {
  const userId = req.body.userId;
  const movieId = req.body.movieId;;

  db.postHistory(userId, movieId)
  .then(() => {
    res.status(201).send('Success POST history data at DB!');
  })
  .catch(err => {
    res.status(400).send(err);
  })
})

app.delete(`/profile/removeeachmovie`, (req, res) => {
  let userId = req.body.userId;;
  const movieId = req.body.movieId;

  db.deletEachMovie(userId, movieId)
  .then((data) => {
    res.status(200).send('Success DELETE the movie from history at DB!');
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

app.delete(`/profile/clearhistory`, (req, res) => {
  const userId = req.body.userId;

  db.deletAllMovies(userId)
  .then((data) => {
    res.status(200).send('Success DELETE all movies from history at DB!');
  })
  .catch((err) => {
    res.status(400).send(err);
  })
})

module.exports = app;

