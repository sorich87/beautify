var app = require('../app')
  , assert = require('assert')
  , request = require('supertest');

describe ('POST /', function () {
  it ('should return beaufiful code when ugly is provided', function (done) {
    request(app)
      .post('/')
      .send({
          lang: 'html'
        , source: '<body><p>Test</p></body>'
      })
      .expect('Content-Type', 'text/plain')
      .expect(200, '<body>\n\t<p>Test</p>\n</body>', done)
  });

  it ('should respond 400 to malformed requests', function (done) {
    request(app)
      .post('/')
      .expect(400);

    request(app)
      .post('/')
      .send({lang: 'html'})
      .expect(400);

    request(app)
      .post('/')
      .send({source: '<body><p>Test</p></body>'})
      .expect(400, done)
  })
});

describe ('GET /', function () {
  it ('should return an empty response', function (done) {
    request(app)
      .get('/')
      .expect(200, '', done)
  })
})
