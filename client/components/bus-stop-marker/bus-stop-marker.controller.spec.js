'use strict';

describe('Controller: BusStopMarkerCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var BusStopMarkerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusStopMarkerCtrl = $controller('BusStopMarkerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
