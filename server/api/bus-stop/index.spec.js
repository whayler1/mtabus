'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var busStopCtrlStub = {
  index: 'busStopCtrl.index',
  show: 'busStopCtrl.show',
  create: 'busStopCtrl.create',
  update: 'busStopCtrl.update',
  destroy: 'busStopCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var busStopIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bus-stop.controller': busStopCtrlStub
});

describe('BusStop API Router:', function() {

  it('should return an express router instance', function() {
    expect(busStopIndex).to.equal(routerStub);
  });

  describe('GET /api/bus-stops', function() {

    it('should route to busStop.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'busStopCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/bus-stops/:id', function() {

    it('should route to busStop.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'busStopCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/bus-stops', function() {

    it('should route to busStop.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'busStopCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/bus-stops/:id', function() {

    it('should route to busStop.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'busStopCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bus-stops/:id', function() {

    it('should route to busStop.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'busStopCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bus-stops/:id', function() {

    it('should route to busStop.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'busStopCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
