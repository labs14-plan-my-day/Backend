const request = require('supertest')

const server = require('./server.js')

describe('server.js', () => {
    describe('index route', () => {
      it('should return an OK status code', async () => {
        return request(server)
        .get('/')
        .expect(200)
      });
    })
})