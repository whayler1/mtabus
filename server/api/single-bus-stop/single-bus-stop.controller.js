/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/single-bus-stops              ->  index
 * POST    /api/single-bus-stops              ->  create
 * GET     /api/single-bus-stops/:id          ->  show
 * PUT     /api/single-bus-stops/:id          ->  update
 * DELETE  /api/single-bus-stops/:id          ->  destroy
 */

'use strict';

var http = require('http');
import _ from 'lodash';
import SingleBusStop from './single-bus-stop.model';

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

// Gets a list of SingleBusStops
export function index(req, res) {

  console.log('query -x-->', req.query);

  return http.get('http://bustime.mta.info/api/where/stop/' + req.query.id +
      '.json?key=' + process.env.MTABUS_APIKEY,

    function(response) {
      var body = '';
      response.on('data', function(d) {
          body += d;
      });
      response.on('end', function() {

          var parsed = JSON.parse(body);
          res.status(200).json(parsed);
      });
    }
  );
}

// Gets a single SingleBusStop from the DB
export function show(req, res) {
  return SingleBusStop.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new SingleBusStop in the DB
export function create(req, res) {
  return SingleBusStop.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SingleBusStop in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return SingleBusStop.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a SingleBusStop from the DB
export function destroy(req, res) {
  return SingleBusStop.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
