'use strict';

describe('Controller: BusMarkerCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var BusMarkerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BusMarkerCtrl = $controller('BusMarkerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
