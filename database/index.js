const { Pool } = require('pg')
require('dotenv').config()
// console.log('process.env: ', process.env);

const pool = new Pool({
  host: process.env.HOST,
  database: process.env.DATABASE,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
})


const getHistory = (userId) => {
  return new Promise ((resolve, reject) => {
    let queryQuestions = `
    SELECT movie_id
    FROM history
    WHERE user_id = ${userId};
    `
    pool.query(queryQuestions, (err, result) => {
      if (err) {
        reject(err);
      } else {
        // console.log('here: ', result)
        resolve(result);
      }
    })
  })
};

const postHistory = (userId, movieId) => {
  return new Promise ((resolve, reject) => {
    let queryPostHistory = `
    INSERT INTO history
    (user_id, movie_id)
    VALUES (${userId}, '${movieId}');
    `
    pool.query(queryPostHistory, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  })
}


module.exports = {
  getHistory,
  postHistory,
};

