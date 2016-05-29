'use strict';

describe('Directive: busesList', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/buses-list/buses-list.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<buses-list></buses-list>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the busesList directive');
  }));
});
