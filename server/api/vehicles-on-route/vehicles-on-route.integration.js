'use strict';

var app = require('../..');
import request from 'supertest';

var newVehiclesOnRoute;

describe('VehiclesOnRoute API:', function() {

  describe('GET /api/vehicles-on-routes', function() {
    var vehiclesOnRoutes;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicles-on-routes')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vehiclesOnRoutes = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(vehiclesOnRoutes).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/vehicles-on-routes', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/vehicles-on-routes')
        .send({
          name: 'New VehiclesOnRoute',
          info: 'This is the brand new vehiclesOnRoute!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newVehiclesOnRoute = res.body;
          done();
        });
    });

    it('should respond with the newly created vehiclesOnRoute', function() {
      expect(newVehiclesOnRoute.name).to.equal('New VehiclesOnRoute');
      expect(newVehiclesOnRoute.info).to.equal('This is the brand new vehiclesOnRoute!!!');
    });

  });

  describe('GET /api/vehicles-on-routes/:id', function() {
    var vehiclesOnRoute;

    beforeEach(function(done) {
      request(app)
        .get('/api/vehicles-on-routes/' + newVehiclesOnRoute._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          vehiclesOnRoute = res.body;
          done();
        });
    });

    afterEach(function() {
      vehiclesOnRoute = {};
    });

    it('should respond with the requested vehiclesOnRoute', function() {
      expect(vehiclesOnRoute.name).to.equal('New VehiclesOnRoute');
      expect(vehiclesOnRoute.info).to.equal('This is the brand new vehiclesOnRoute!!!');
    });

  });

  describe('PUT /api/vehicles-on-routes/:id', function() {
    var updatedVehiclesOnRoute;

    beforeEach(function(done) {
      request(app)
        .put('/api/vehicles-on-routes/' + newVehiclesOnRoute._id)
        .send({
          name: 'Updated VehiclesOnRoute',
          info: 'This is the updated vehiclesOnRoute!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedVehiclesOnRoute = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedVehiclesOnRoute = {};
    });

    it('should respond with the updated vehiclesOnRoute', function() {
      expect(updatedVehiclesOnRoute.name).to.equal('Updated VehiclesOnRoute');
      expect(updatedVehiclesOnRoute.info).to.equal('This is the updated vehiclesOnRoute!!!');
    });

  });

  describe('DELETE /api/vehicles-on-routes/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/vehicles-on-routes/' + newVehiclesOnRoute._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when vehiclesOnRoute does not exist', function(done) {
      request(app)
        .delete('/api/vehicles-on-routes/' + newVehiclesOnRoute._id)
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
