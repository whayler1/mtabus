'use strict';

var app = require('../..');
import request from 'supertest';

var newBusStop;

describe('BusStop API:', function() {

  describe('GET /api/bus-stops', function() {
    var busStops;

    beforeEach(function(done) {
      request(app)
        .get('/api/bus-stops')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          busStops = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(busStops).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/bus-stops', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bus-stops')
        .send({
          name: 'New BusStop',
          info: 'This is the brand new busStop!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBusStop = res.body;
          done();
        });
    });

    it('should respond with the newly created busStop', function() {
      expect(newBusStop.name).to.equal('New BusStop');
      expect(newBusStop.info).to.equal('This is the brand new busStop!!!');
    });

  });

  describe('GET /api/bus-stops/:id', function() {
    var busStop;

    beforeEach(function(done) {
      request(app)
        .get('/api/bus-stops/' + newBusStop._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          busStop = res.body;
          done();
        });
    });

    afterEach(function() {
      busStop = {};
    });

    it('should respond with the requested busStop', function() {
      expect(busStop.name).to.equal('New BusStop');
      expect(busStop.info).to.equal('This is the brand new busStop!!!');
    });

  });

  describe('PUT /api/bus-stops/:id', function() {
    var updatedBusStop;

    beforeEach(function(done) {
      request(app)
        .put('/api/bus-stops/' + newBusStop._id)
        .send({
          name: 'Updated BusStop',
          info: 'This is the updated busStop!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBusStop = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBusStop = {};
    });

    it('should respond with the updated busStop', function() {
      expect(updatedBusStop.name).to.equal('Updated BusStop');
      expect(updatedBusStop.info).to.equal('This is the updated busStop!!!');
    });

  });

  describe('DELETE /api/bus-stops/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bus-stops/' + newBusStop._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when busStop does not exist', function(done) {
      request(app)
        .delete('/api/bus-stops/' + newBusStop._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
