/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // var cors = require('cors');
  // app.get('/api/where', cors(), function(req, res, next){
  //   res.json({msg: 'This is CORS-enabled for all origins!'});
  // });
  // Insert routes below
  app.use('/api/vehicles-on-routes', require('./api/vehicles-on-route'));
  app.use('/api/single-bus-stops', require('./api/single-bus-stop'));
  app.use('/api/bus-stops', require('./api/bus-stop'));
  app.use('/api/things', require('./api/thing'));
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
