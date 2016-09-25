'use strict';

angular.module('mtabusApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('route', {
        url: '/routes/:routeId',
        resolve: {
          route: ($q, $log, $stateParams, busTime) => busTime.getRoute($stateParams.routeId).then(
            res => {
              const { data } = res.data;
              data.route = _.find(data.references.routes, {id: data.entry.routeId});
              // data.polylines = data.entry.polylines.map(line => line.points).join(' ');
              return $q.when(data);
            },
            err => {
              $log.error('err!', err);
              return $q.when();
            }
          )
        },
        data: {
          pageTitle: '{{ route.route.shortName }} Bus Route',
          description: '{{ route.route.shortName }} Bus Route, serving {{ route.route.longName }} {{ route.route.description }}. {{ route.route.agencyId }}',
          schema: `{
            "@context": "http://schema.org",
            "@type": "Service",
            "brand": {
              "@type": "Organization",
              "name": "MTA"
            },
            "areaServed": "New York City",
            "name": "{{ route.route.shortName }} Bus Route",
            "category": {
              "@type": "BusTrip",
              "busName": "{{ route.route.longName }}",
              "busNumber": "{{ route.route.shortName }}",
              "description": "{{ route.route.description }}"
            }
          }`
        },
        controller: ($scope, $rootScope, route) => {
          console.log('route', route);
          $scope.route = route;
          $rootScope.$emit('toggle-show-list-view', true);
        },
        template: '<navbar></navbar><single-route route="route"></single-route>'
      });
  });
