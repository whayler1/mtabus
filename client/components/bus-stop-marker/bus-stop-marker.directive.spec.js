'use strict';

describe('Directive: busStopMarker', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/bus-stop-marker/bus-stop-marker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bus-stop-marker></bus-stop-marker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the busStopMarker directive');
  }));
});
