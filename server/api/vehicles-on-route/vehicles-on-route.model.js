'use strict';

import mongoose from 'mongoose';

var VehiclesOnRouteSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('VehiclesOnRoute', VehiclesOnRouteSchema);
