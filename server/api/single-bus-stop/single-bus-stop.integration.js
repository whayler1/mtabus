'use strict';

var app = require('../..');
import request from 'supertest';

var newSingleBusStop;

describe('SingleBusStop API:', function() {

  describe('GET /api/single-bus-stops', function() {
    var singleBusStops;

    beforeEach(function(done) {
      request(app)
        .get('/api/single-bus-stops')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          singleBusStops = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(singleBusStops).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/single-bus-stops', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/single-bus-stops')
        .send({
          name: 'New SingleBusStop',
          info: 'This is the brand new singleBusStop!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSingleBusStop = res.body;
          done();
        });
    });

    it('should respond with the newly created singleBusStop', function() {
      expect(newSingleBusStop.name).to.equal('New SingleBusStop');
      expect(newSingleBusStop.info).to.equal('This is the brand new singleBusStop!!!');
    });

  });

  describe('GET /api/single-bus-stops/:id', function() {
    var singleBusStop;

    beforeEach(function(done) {
      request(app)
        .get('/api/single-bus-stops/' + newSingleBusStop._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          singleBusStop = res.body;
          done();
        });
    });

    afterEach(function() {
      singleBusStop = {};
    });

    it('should respond with the requested singleBusStop', function() {
      expect(singleBusStop.name).to.equal('New SingleBusStop');
      expect(singleBusStop.info).to.equal('This is the brand new singleBusStop!!!');
    });

  });

  describe('PUT /api/single-bus-stops/:id', function() {
    var updatedSingleBusStop;

    beforeEach(function(done) {
      request(app)
        .put('/api/single-bus-stops/' + newSingleBusStop._id)
        .send({
          name: 'Updated SingleBusStop',
          info: 'This is the updated singleBusStop!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSingleBusStop = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSingleBusStop = {};
    });

    it('should respond with the updated singleBusStop', function() {
      expect(updatedSingleBusStop.name).to.equal('Updated SingleBusStop');
      expect(updatedSingleBusStop.info).to.equal('This is the updated singleBusStop!!!');
    });

  });

  describe('DELETE /api/single-bus-stops/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/single-bus-stops/' + newSingleBusStop._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when singleBusStop does not exist', function(done) {
      request(app)
        .delete('/api/single-bus-stops/' + newSingleBusStop._id)
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
