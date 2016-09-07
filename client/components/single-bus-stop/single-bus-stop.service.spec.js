'use strict';

describe('Service: singleBusStop', function () {

  // load the service's module
  beforeEach(module('mtabusApp'));

  // instantiate service
  var singleBusStop;
  beforeEach(inject(function (_singleBusStop_) {
    singleBusStop = _singleBusStop_;
  }));

  it('should do something', function () {
    expect(!!singleBusStop).to.be.true;
  });

});
