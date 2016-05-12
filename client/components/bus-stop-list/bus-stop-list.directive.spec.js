'use strict';

describe('Directive: busStopList', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/bus-stop-list/bus-stop-list.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<bus-stop-list></bus-stop-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the busStopList directive');
  }));
});
