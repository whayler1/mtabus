/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/vehicles-on-routes              ->  index
 * POST    /api/vehicles-on-routes              ->  create
 * GET     /api/vehicles-on-routes/:id          ->  show
 * PUT     /api/vehicles-on-routes/:id          ->  update
 * DELETE  /api/vehicles-on-routes/:id          ->  destroy
 */

'use strict';

var http = require('http');
import _ from 'lodash';
import VehiclesOnRoute from './vehicles-on-route.model';

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

// Gets a list of VehiclesOnRoutes
export function index(req, res) {

  console.log('query -x-->', req.query);

  // http://bustime.mta.info/api/siri/stop-monitoring.json?key=71f7d3b8-d9d5-4791-aeec-f95564ff0bb4&OperatorRef=MTA%20NYCT&LineRef=B43&MonitoringRef=MTA_305175

  return http.get('http://bustime.mta.info/api/siri/stop-monitoring.json' +
      '?OperatorRef=' + req.query.operator +
      '&LineRef=' + req.query.route +
      '&MonitoringRef=' + req.query.stop +
      '&key=' + process.env.MTABUS_APIKEY,

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

// Gets a single VehiclesOnRoute from the DB
export function show(req, res) {
  return VehiclesOnRoute.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new VehiclesOnRoute in the DB
export function create(req, res) {
  return VehiclesOnRoute.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing VehiclesOnRoute in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return VehiclesOnRoute.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a VehiclesOnRoute from the DB
export function destroy(req, res) {
  return VehiclesOnRoute.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
