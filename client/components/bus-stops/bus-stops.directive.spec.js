'use strict';

describe('Directive: busStops', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/bus-stops/bus-stops.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bus-stops></bus-stops>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the busStops directive');
  }));
});
