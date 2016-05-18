'use strict';

describe('Directive: singleBusStop', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/single-bus-stop/single-bus-stop.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<single-bus-stop></single-bus-stop>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the singleBusStop directive');
  }));
});
