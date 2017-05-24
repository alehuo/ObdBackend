process.env.NODE_ENV = 'test';

var assert = require('assert');
var chai = require('chai')
  , chaiHttp = require('chai-http');


var port = process.env.PORT || 8080;
var express = require('express');
var app = express();

/*app = "http://localhost:8080/api"*/
var apiRoutes = require('./../routes/apiRoutes.js');
var create_db = require('./../database/create_db.js');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/api', apiRoutes());
/*
app.listen(port, function(err) {
  console.log('Listening on port', port);
});*/

create_db();
app = "http://localhost:8080/api"
/*var server = require('./../index.js')
/*let mongoose = require("mongoose");*/

//let SensorData = require('./../database/models/SensorData.js');
let should = chai.should();



chai.use(chaiHttp);

describe('/sensordata ', () => {
  it('GET, without auth, should return 401', (done) => {
    chai.request(app)
    .get('/sensordata/1')
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });
  it('POST, without auth, should return 401', (done) => {
    chai.request(app)
    .post('/sensordata')
    .send({Sensor: 'RPM', Value: '14000', Timestamp: '2017-05-15T12:51:45+00:00'})
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });
  it('POST, with auth, should return 200', (done) => {
    chai.request(app)
    .post('/sensordata')
    .send({Sensor: 'RPM', Value: '14000', Timestamp: '2017-05-15T12:51:45+00:00'})
    .end(function(err, res) {
      res.should.have.status(200);
      done();
    });
  });
});
describe('/car ', () => {
  it('GET /1, without auth, should return 401', (done) => {
    chai.request(app)
    .get('/car/1')
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });
  it('POST, without auth, should return 401');/*, (done) => {
    chai.request(app)
    .post('/car')
    .send({Vin: '123', DisplayName: 'Toyoda'})
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });*/
});
describe('/location ', () => {
  it('GET /1, without auth, should return 401', (done) => {
    chai.request(app)
    .get('/location/1')
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });
  it('POST, without auth, should return 401');/*, (done) => {
    chai.request(app)
    .post('/location')
    .send({GpsLon: 60.199172, GpsLat: 24.986826, CarId: 1, Timestamp: '2017-05-14 15:36:00'})
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });*/
});
describe('/logging ', () => {
it('GET /1, without auth, should return 401', (done) => {
  chai.request(app)
  .get('/logging/1')
  .end(function(err, res) {
    res.should.have.status(401);
    done();
  });
});
  it('POST, without auth, should return 401');/*, (done) => {
    chai.request(app)
    .post('/logging')
    .send({Vin: '123', DisplayName: 'Toyoda'})
    .end(function(err, res) {
      res.should.have.status(401);
      done();
    });
  });*/
});








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
