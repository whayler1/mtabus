'use strict';

angular.module('mtabusApp').config(function ($stateProvider) {
  $stateProvider
    .state('main', {
      url: '/',
      abstract: true,
      template: '<navbar></navbar><map></map><user-location-marker></user-location-marker><bus-stops></bus-stops><user-location-button></user-location-button><ui-view></ui-view>'
    })
    .state('main.bus-stops', {
      url: '',
      data: {
        description: 'Find out how long till the next bus arrives at any MTA bus stop in all of New York City. Servicing Manhattan, Brooklyn, Queens, The Bronx and Staten Island',
        schema: `{
          "@context": "http://schema.org",
          "@type": "Website",
          "author": {
            "@type": "Person",
            "email": "jstn@jstn.name",
            "givenName": "Justin",
            "familyName": "Worsdale",
            "name": "Justin Dean Worsdale",
            "image": "http://jstn.name/wp-content/uploads/2013/09/portrait-we.jpg",
            "sameAs": "http://jstn.name",
            "jobTitle": "Software Engineer"
          },
          "url": "https://www.busfinder.nyc",
          "description": "Find out how long till the next bus arrives at any MTA bus stop in all of New York City. Servicing Manhattan, Brooklyn, Queens, The Bronx and Staten Island"
        }`
      },
      controller: ($scope, $rootScope, $window, location, map) => {
        const stateChangeSuccessListener = $scope.$on('$stateChangeSuccess', (event, toState, toParams, fromState) => {
          if(!fromState.name) {
            location.getCoords.then(
              coords => {
                map.gmap.setCenter(new $window.google.maps.LatLng(
                  coords.latitude,
                  coords.longitude
                ));
              }
            );
          }
          stateChangeSuccessListener();
        });
        $rootScope.$emit('toggle-show-list-view', false);
      },
      template: '<bus-stop-list></bus-stop-list><ui-view></ui-view>'
    })
    .state('main.bus-stop', {
      url: ':id',
      data: {
        pageTitle: '{{ busStop.nameTitlecase }} Bus Stop headed {{ busStop.directionLong }}',
        description: 'Service for {{ busStop.routeNames.join(\', \') }}',
        schema: `{
          "@context": "http://schema.org",
          "@type": "BusStop",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "{{ busStop.lat }}",
            "longitude": "{{ busStop.lon }}"
          },
          "name": "{{ busStop.nameTitlecase }} Bus Stop",
          "description": "Service for {{ busStop.routeNames.join(', ') }}"
        }`
      },
      resolve: {
        busStop: ($q, $log, $filter, $stateParams, busTime, busesList) => busTime.getBusStop($stateParams.id).then(
          res => {
            const { data } = res.data;
            if(_.hasIn(data, 'name')) {
              data.nameTitlecase = $filter('titlecase')(data.name.replace('/', ' / '));
            }
            const routeNames = data.routes.map(route => `${route.shortName} ${route.longName}`);
            data.directionLong = $filter('direction')(data.direction);
            data.routeNames = routeNames;
            $log.log('%csingle bus stop!', 'background:magenta', data);

            const promiseAry = data.routes.map(route => busesList.getBuses(
              route.agency.id,
              route.shortName,
              data.id
            ));

            $log.log('promiseAry:', promiseAry)

            $q.all(promiseAry).then(
              res => res.forEach(bus => $log.log('bus:', bus)),
              res => $log.error('boo route error', res)
            );

            return $q.when(data);
          },
          res => {
            $log.error('FAIL loading single bus stop :(', res);
            return $q.when({error: true});
          }
        )
      },
      controller: ($scope, $rootScope, busStop) => {
        $scope.busStop = busStop;
        $rootScope.$emit('toggle-show-list-view', true);
      },
      template: '<single-bus-stop bus-stop="busStop"></single-bus-stop><ui-view></ui-view>'
    })
    .state('main.bus-stop.buses', {
      url: '/:operator/:route',
      data: {
        pageTitle: '{{ route.shortName }} Bus headed {{ busStop.directionLong }} at {{ busStop.nameTitlecase }}',
        description: 'The {{ route.shortName }} bus stop at {{ busStop.nameTitlecase }}, heading to {{ route.longName }} {{ route.description }}. {{ route.agency.name }}',
        schema: `{
          "@context": "http://schema.org",
          "@type": "BusStop",
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": "{{ busStop.lat }}",
            "longitude": "{{ busStop.lon }}"
          },
          "name": "{{ route.shortName }} Bus at {{ busStop.nameTitlecase }}",
          "description": "The {{ route.shortName }} bus stop at {{ busStop.nameTitlecase }}, heading to {{ route.longName }} {{ route.description }}. {{ route.agency.name }}",
          "telephone": "{{ route.agency.phone }}"
        }`
      },
      resolve: {
        buses: ($q, $log, $stateParams, busesList) => busesList.getBuses(
          $stateParams.operator,
          $stateParams.route,
          $stateParams.id
        ).then(
          buses => {
            busesList.watch(
              $stateParams.operator,
              $stateParams.route,
              $stateParams.id
            );
            return $q.when(buses);
          }
        ),
        route: ($q, $stateParams, busStop) => $q.when(_.find(busStop.routes, {shortName:$stateParams.route}))
      },
      controller: ($scope, $stateParams, $log, buses, busesList, busStop, route) => {
        $scope.buses = buses;
        $log.log('buses!:', buses);
        $log.log('busStop:', busStop);
        $scope.route = route;
        $log.log('route:', $scope.route);

        $scope.$on('$stateChangeStart', () => {
          $log.log('leaving buses list');
          busesList.unwatch();
          $scope.buses.length = 0;
        });
      },
      template: '<buses-list buses="buses" bus-stop="busStop"></buses-list><div ng-if="buses.length"><bus-marker ng-repeat="bus in buses" bus="bus" route="route"></bus-marker></div>'
    });
})

.run(function($rootScope, $window, $location) {
  $rootScope.$on('$stateChangeSuccess', (e, toState, toParams, fromState, fromParams) => {
    const path = $location.path();
    let search = '';
    let referrer = '';
    const searchIndex = path.indexOf('?');
    if(searchIndex !== -1) {
      search = path.substring(searchIndex, path.length);
    }
    if(fromState.name) {
      referrer = `${$location.protocol()}://${$location.host()}${fromState.url}`;
    }
    if('analytics' in $window) {
      $window.analytics.page({
        path,
        referrer,
        search,
        name: toState.name,
        url: $location.absUrl()
      });
    }
  });
});
