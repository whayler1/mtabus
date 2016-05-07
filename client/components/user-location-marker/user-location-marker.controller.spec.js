'use strict';

describe('Controller: UserLocationMarkerCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var UserLocationMarkerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserLocationMarkerCtrl = $controller('UserLocationMarkerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
