'use strict';

describe('Service: busStops', function () {

  // load the service's module
  beforeEach(module('mtabusApp'));

  // instantiate service
  var busStops;
  beforeEach(inject(function (_busStops_) {
    busStops = _busStops_;
  }));

  it('should do something', function () {
    expect(!!busStops).to.be.true;
  });

});
