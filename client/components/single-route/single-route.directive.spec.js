'use strict';

describe('Directive: singleRoute', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/single-route/single-route.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<single-route></single-route>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the singleRoute directive');
  }));
});
