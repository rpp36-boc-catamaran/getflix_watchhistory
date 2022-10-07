const app = require("./index.js");
const request = require("supertest");

describe('GET /profile', () => {

  test('should response 200 status', async () => {
    const res = await request(app)
      .get(`/profile`)
    expect(res.status).toEqual(200);
  })
});