'use strict';

import mongoose from 'mongoose';

var SingleBusStopSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('SingleBusStop', SingleBusStopSchema);
