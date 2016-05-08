/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/bus-stops              ->  index
 * POST    /api/bus-stops              ->  create
 * GET     /api/bus-stops/:id          ->  show
 * PUT     /api/bus-stops/:id          ->  update
 * DELETE  /api/bus-stops/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
// import BusStop from './bus-stop.model';
var http = require('http');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of BusStops
export function index(req, res) {
  console.log('process.emnv', process.env)

  return http.get('http://bustime.mta.info/api/where/stops-for-location.json?lat=40.748433&lon=-73.985656&latSpan=0.005&lonSpan=0.005&key=' + process.env.MTABUS_APIKEY,
    // console.log('hitting bus stop endpoint');xz
    function(response) {
      // console.log('response:', response);
      // Continuously update stream with data
      var body = '';
      response.on('data', function(d) {
          body += d;
      });
      response.on('end', function() {

          // Data reception is done, do whatever with it!
          var parsed = JSON.parse(body);
          // callback({
          //     email: parsed.email,
          //     password: parsed.pass
          // });
          res.status(200).json(parsed);
      });
    }
  );

  // return BusStop.find().exec()
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Gets a single BusStop from the DB
export function show(req, res) {
  // return BusStop.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Creates a new BusStop in the DB
export function create(req, res) {
  // return BusStop.create(req.body)
  //   .then(respondWithResult(res, 201))
  //   .catch(handleError(res));
}

// Updates an existing BusStop in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  // return BusStop.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(saveUpdates(req.body))
  //   .then(respondWithResult(res))
  //   .catch(handleError(res));
}

// Deletes a BusStop from the DB
export function destroy(req, res) {
  // return BusStop.findById(req.params.id).exec()
  //   .then(handleEntityNotFound(res))
  //   .then(removeEntity(res))
  //   .catch(handleError(res));
}
