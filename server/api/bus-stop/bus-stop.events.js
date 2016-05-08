/**
 * BusStop model events
 */

'use strict';

import {EventEmitter} from 'events';
import BusStop from './bus-stop.model';
var BusStopEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BusStopEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  BusStop.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BusStopEvents.emit(event + ':' + doc._id, doc);
    BusStopEvents.emit(event, doc);
  }
}

export default BusStopEvents;
