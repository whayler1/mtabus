'use strict';

describe('Service: busTime', function () {

  // load the service's module
  beforeEach(module('mtabusApp'));

  // instantiate service
  var busTime;
  beforeEach(inject(function (_busTime_) {
    busTime = _busTime_;
  }));

  it('should do something', function () {
    expect(!!busTime).to.be.true;
  });

});
