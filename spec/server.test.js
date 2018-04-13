const request = require('supertest');
const app = require('../../server/index.js');

describe('Test the login path', () => {
  test('It should accept a POST method to /login', (done) => {
    request(app)
    .post('/login')
    .set('Content-Type', 'application/json')
    .send(JSON.strngify({username: username, password: password}))
    .expect(200)
  })
})

