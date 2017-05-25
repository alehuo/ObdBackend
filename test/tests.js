process.env.NODE_ENV = 'test';

var assert = require('assert');
var chai = require('chai'),
  chaiHttp = require('chai-http');


var port = process.env.PORT || 8080;
var express = require('express');
var app = require('../index');

let should = chai.should();



chai.use(chaiHttp);

describe('/api/sensordata ', () => {
  it('GET, without auth, should return 401', (done) => {
    chai.request(app)
      .get('/api/sensordata/1')
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });
  it('POST, without auth, should return 401', (done) => {
    chai.request(app)
      .post('/api/sensordata')
      .send({
        Sensor: 'RPM',
        Value: '14000',
        Timestamp: '2017-05-15T12:51:45+00:00'
      })
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });
  it('POST, with auth, should return 200', (done) => {
    authentication('admin', 'admin', function (res) {
      chai.request(app)
        .post('/api/sensordata')
        .set('x-access-token', res.body.token)
        .send({
          Sensor: 'RPM',
          Value: '14000',
          Timestamp: '2017-05-15T12:51:45+00:00'
        })
        .end(function (err, res) {
          res.should.have.status(200);
          done();
        });
    })

  });
});
describe('/api/car ', () => {
  it('GET with ID 1, without auth, should return 401', (done) => {
    chai.request(app)
      .get('/api/car/1')
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });
  it('POST, without auth, should return 401');
  /*, (done) => {
      chai.request(app)
      .post('/car')
      .send({Vin: '123', DisplayName: 'Toyoda'})
      .end(function(err, res) {
        res.should.have.status(401);
        done();
      });
    });*/
});
describe('/api/location ', () => {
  it('GET with ID 1, without auth, should return 401', (done) => {
    chai.request(app)
      .get('/api/location/1')
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });
  it('POST, without auth, should return 401');
  /*, (done) => {
      chai.request(app)
      .post('/location')
      .send({GpsLon: 60.199172, GpsLat: 24.986826, CarId: 1, Timestamp: '2017-05-14 15:36:00'})
      .end(function(err, res) {
        res.should.have.status(401);
        done();
      });
    });*/
});
describe('/api/logging ', () => {
  it('GET with ID 1, without auth, should return 401', (done) => {
    chai.request(app)
      .get('/api/logging/1')
      .end(function (err, res) {
        res.should.have.status(401);
        done();
      });
  });
  it('POST, without auth, should return 401');
  /*, (done) => {
      chai.request(app)
      .post('/logging')
      .send({Vin: '123', DisplayName: 'Toyoda'})
      .end(function(err, res) {
        res.should.have.status(401);
        done();
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
    .post('/api/authentication').send({
      username: username,
      password: password
    }).end(function (err, res) {
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