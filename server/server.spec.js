const app = require("./index.js");
const request = require("supertest");
const {pool: pool} = require("../database/index.js");

// close pool after tests are completed
afterAll(() => pool.end());

/**** GEI history ****/
describe('GET /profile/gethistory', () => {
  const testUserID = 1;

  test('should response 200 status with valid user_id', async () => {
    const res = await request(app)
      .get(`/profile/gethistory?user_id=${testUserID}`)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(200);
    expect(res.headers['content-type']).toMatch(/json/);
  });

  test('should response 400 status with invalid user_id', async () => {
    const res = await request(app)
      .get(`/profile/gethistory?user_id=invalidID`)
      .set('Accept', 'application/json');
    expect(res.status).toEqual(400);
  });

  test('should find the history by provided user_id', async () => {
    const res = await request(app)
      .get(`/profile/gethistory?user_id=${testUserID}`)
      .set('Accept', 'application/json');
    expect(res.body[0]).toBe(525);
    expect(res.body[1]).toBe(520);
    expect(res.body[2]).toBe(515);
    expect(res.body[3]).toBe(510);
    expect(res.body[4]).toBe(505);
    expect(res.body[5]).toBe(500);
  });
});

/**** POST a movie ****/
describe('POST /main/updatehistory', () => {
  const testData = {
    "userId": 1000,
    "movieId": 1000,
  }

  afterEach(async () => {
    await pool.query('DELETE FROM history WHERE user_id = 1000 AND movie_id = 1000;');
  });

  test('should response 201 status and success message with valid input data', async () => {
    const res = await request(app)
      .post(`/main/updatehistory`)
      .send(testData)
    expect(res.status).toEqual(201);
    expect(res.text).toEqual('Success POST history data at DB!');
  });

  test('should response 400 status and server error with invalid input data', async () => {
    const res = await request(app)
      .post(`/main/updatehistory`)
      .send('invalidData')
    expect(res.status).toEqual(400);
  });
});

/**** DELETE a movie ****/
describe('DELETE /profile/removeeachmovie', () => {
  const testData = {
    "userId": 2000,
    "movieId": 2000,
  }

  test('should response 200 status and success message with valid input data', async () => {
    const res = await request(app)
      .del(`/profile/removeeachmovie`)
      .send(testData)
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('Success DELETE the movie from history at DB!');
  });

  test('should response 400 status and server error with invalid input data', async () => {
    const res = await request(app)
      .del(`/profile/removeeachmovie`)
      .send('invalidData')
    expect(res.status).toEqual(400);
  });
});


/**** DELETE all movies ****/
describe('DELETE /profile/clearhistory', () => {
  const testData = {
    "userId": 5000,
  }

  test('should response 200 status and success message with valid input data', async () => {
    const res = await request(app)
      .del(`/profile/clearhistory`)
      .send(testData)
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('Success DELETE all movies from history at DB!');
  });

  test('should response 400 status and server error with invalid input data', async () => {
    const res = await request(app)
      .del(`/profile/clearhistory`)
      .send('invalidData')
    expect(res.status).toEqual(400);
  });
});
