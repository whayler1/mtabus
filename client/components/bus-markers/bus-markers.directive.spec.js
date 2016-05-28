'use strict';

describe('Directive: busMarkers', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/bus-markers/bus-markers.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bus-markers></bus-markers>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the busMarkers directive');
  }));
});
