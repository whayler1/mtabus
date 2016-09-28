'use strict';

describe('Directive: focus', function () {

  // load the directive's module
  beforeEach(module('mtabusApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<focus></focus>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the focus directive');
  }));
});
