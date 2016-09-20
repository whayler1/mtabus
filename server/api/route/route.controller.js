/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/routes              ->  index
 * POST    /api/routes              ->  create
 * GET     /api/routes/:id          ->  show
 * PUT     /api/routes/:id          ->  update
 * DELETE  /api/routes/:id          ->  destroy
 */

'use strict';

var http = require('http');
import _ from 'lodash';
import Route from './route.model';

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

// Gets a list of Routes
export function index(req, res) {
  return http.get('http://bustime.mta.info/api/where/routes-for-agency/MTA%20NYCT.json?key=' + process.env.MTABUS_APIKEY,

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

// Gets a single Route from the DB
export function show(req, res) {
  return http.get('http://bustime.mta.info/api/where/stops-for-route/' + req.params.id + '.json?key=' + process.env.MTABUS_APIKEY + '&includePolylines=false&version=2',
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

// Creates a new Route in the DB
export function create(req, res) {
  return Route.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Route in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Route.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Route from the DB
export function destroy(req, res) {
  return Route.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
