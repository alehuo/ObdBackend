process.env.NODE_ENV = 'test';

var assert = require('assert');
var chai = require('chai')
  , chaiHttp = require('chai-http');

var app = "http://localhost:8080/api"

//var server = require('./../index.js')
/*let mongoose = require("mongoose");*/

let SensorData = require('./../database/models/SensorData.js');
let should = chai.should();

chai.use(chaiHttp);

describe('GET, without auth', () => {
  it('GET /sensordata, should return 401', (done) => {
    chai.request(app)
    .get('/sensordata/1')
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });
  it('GET /car, should return 401', (done) => {
    chai.request(app)
    .get('/car/1')
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });
  it('GET /location, should return 401', (done) => {
    chai.request(app)
    .get('/location/1')
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
});
it('GET /logging, should return 401', (done) => {
  chai.request(app)
  .get('/logging/1')
  .end(function(err, res) {
    res.should.have.status(401);
    done();
  });
});

});
describe('POST, without auth', () => {
  it('POST /sensordata, should return 401', (done) => {
    chai.request(app)
    .post('/sensordata')
    .send({Sensor: 'RPM', Value: '14000', Timestamp: '2017-05-15T12:51:45+00:00'})
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });

  it('POST /logging, should return 401');/*, (done) => {
    chai.request(app)
    .post('/car')
    .send({Vin: '123', DisplayName: 'Toyoda'})
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });*/

  it('POST /car, should return 401');/*, (done) => {
    chai.request(app)
    .post('/car')
    .send({Vin: '123', DisplayName: 'Toyoda'})
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });*/
  it('POST /location, should return 401');/*, (done) => {
    chai.request(app)
    .post('/location')
    .send({GpsLon: 60.199172, GpsLat: 24.986826, CarId: 1, Timestamp: '2017-05-14 15:36:00'})
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });*/
});

/*

 */

describe('POST, with auth', () => {
  it('POST /sensordata, should return 200', (done) => {
    authentication('user','user',(res) => {
      chai.request(app)
      .post('/sensordata')
      .set('x-access-token', res.body.token)
      .send({Sensor: 'RPM', Value: '14000', Timestamp: '2017-05-15T12:51:45+00:00'})
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
  //Hello world
  /*it('post /location, should return: 200', (done) => {
		chai.request(app)
		.post('/authentication').send({username: 'admin', password: 'admin'}).end(function(err, res) {
      res.should.have.status(200);
      var token = res.body.token;
      chai.request(app)
      .post('/sensordata')
      .set('x-access-token', token)
      .send({Sensor: 'RPM', Value: '14000', Timestamp: '2017-05-15T12:51:45+00:00'})
      .end(function(err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });*/
});

describe('Authentication test', () => {
  it('Authentication with wrong credentials should return 400', (done) => {
		authentication('wrong','credentials',(res) => {
      res.should.have.status(400);
      done();
    });
  });
  it('Authentication with correct credentials should return 200', (done) => {
    authentication('user','user',(res) => {
      res.should.have.status(200);
      done();
    });
  });
});

//Authentication function
const authentication = (username, password, fn) => {
  chai.request(app)
  .post('/authentication').send({username: username, password: password}).end(function(err, res) {
    fn(res)
  });
}

  /*



  .field('_method', 'put')
  .field('password', '123')
  .field('confirmPassword', '123')

/*
describe('SensorData', () => {

    beforeEach((done) => { //Before each test we empty the database
        SensorData.remove({}, (err) => {
            done();
        });
    });

    describe('SensorData', () => {
        describe('POST', () => {
            it('should return: 200, Sensor history inserted', (done) => {
                chai.request(server)
                    .post('/sensordata')
                    .end((err, res) => {
                        res.should.have.status(200);
                        /*res.body.should.be.a('array');
                        /*res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
        describe('/GET', () => {
            it('should return: 200, sensor history', (done) => {
                chai.request(server)
                    .get('/sensordata')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });
        });
    });
    describe('Car', function() {
        describe('GET', function() {
            it('should return a Car');
        });
    });
});
*/
