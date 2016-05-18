/**
 * SingleBusStop model events
 */

'use strict';

import {EventEmitter} from 'events';
import SingleBusStop from './single-bus-stop.model';
var SingleBusStopEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SingleBusStopEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SingleBusStop.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SingleBusStopEvents.emit(event + ':' + doc._id, doc);
    SingleBusStopEvents.emit(event, doc);
  }
}

export default SingleBusStopEvents;
