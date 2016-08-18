'use strict';

describe('Controller: BodyClassCtrl', function () {

  // load the controller's module
  beforeEach(module('mtabusApp'));

  var BodyClassCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BodyClassCtrl = $controller('BodyClassCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
