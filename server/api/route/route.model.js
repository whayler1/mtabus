'use strict';

import mongoose from 'mongoose';

var RouteSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Route', RouteSchema);
