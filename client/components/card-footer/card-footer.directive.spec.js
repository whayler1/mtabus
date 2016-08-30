'use strict';

describe('Directive: cardFooter', function () {

  // load the directive's module and view
  beforeEach(module('mtabusApp'));
  beforeEach(module('components/card-footer/card-footer.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<card-footer></card-footer>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the cardFooter directive');
  }));
});
