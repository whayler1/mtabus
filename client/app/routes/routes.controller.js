'use strict';
(function(){

class RoutesComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('mtabusApp')
  .component('routes', {
    templateUrl: 'app/routes/routes.html',
    controller: RoutesComponent
  });

})();
