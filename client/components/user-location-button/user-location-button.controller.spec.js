'use strict';

describe('Controller: UserLocationButtonCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var UserLocationButtonCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserLocationButtonCtrl = $controller('UserLocationButtonCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
