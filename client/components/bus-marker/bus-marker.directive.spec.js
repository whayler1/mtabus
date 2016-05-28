'use strict';

describe('Directive: busMarker', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/bus-marker/bus-marker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bus-marker></bus-marker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the busMarker directive');
  }));
});
