'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var vehiclesOnRouteCtrlStub = {
  index: 'vehiclesOnRouteCtrl.index',
  show: 'vehiclesOnRouteCtrl.show',
  create: 'vehiclesOnRouteCtrl.create',
  update: 'vehiclesOnRouteCtrl.update',
  destroy: 'vehiclesOnRouteCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var vehiclesOnRouteIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './vehicles-on-route.controller': vehiclesOnRouteCtrlStub
});

describe('VehiclesOnRoute API Router:', function() {

  it('should return an express router instance', function() {
    expect(vehiclesOnRouteIndex).to.equal(routerStub);
  });

  describe('GET /api/vehicles-on-routes', function() {

    it('should route to vehiclesOnRoute.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'vehiclesOnRouteCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/vehicles-on-routes/:id', function() {

    it('should route to vehiclesOnRoute.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'vehiclesOnRouteCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/vehicles-on-routes', function() {

    it('should route to vehiclesOnRoute.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'vehiclesOnRouteCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/vehicles-on-routes/:id', function() {

    it('should route to vehiclesOnRoute.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'vehiclesOnRouteCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/vehicles-on-routes/:id', function() {

    it('should route to vehiclesOnRoute.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'vehiclesOnRouteCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/vehicles-on-routes/:id', function() {

    it('should route to vehiclesOnRoute.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'vehiclesOnRouteCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
