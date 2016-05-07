'use strict';

describe('Directive: userLocationMarker', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/user-location-marker/user-location-marker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<user-location-marker></user-location-marker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the userLocationMarker directive');
  }));
});
