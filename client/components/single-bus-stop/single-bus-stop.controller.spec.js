'use strict';

describe('Controller: SingleBusStopCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var SingleBusStopCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SingleBusStopCtrl = $controller('SingleBusStopCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
