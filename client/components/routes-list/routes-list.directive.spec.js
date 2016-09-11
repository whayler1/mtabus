'use strict';

describe('Directive: routesList', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/routes-list/routes-list.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<routes-list></routes-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the routesList directive');
  }));
});
