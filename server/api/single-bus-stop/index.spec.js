'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var singleBusStopCtrlStub = {
  index: 'singleBusStopCtrl.index',
  show: 'singleBusStopCtrl.show',
  create: 'singleBusStopCtrl.create',
  update: 'singleBusStopCtrl.update',
  destroy: 'singleBusStopCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var singleBusStopIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './single-bus-stop.controller': singleBusStopCtrlStub
});

describe('SingleBusStop API Router:', function() {

  it('should return an express router instance', function() {
    expect(singleBusStopIndex).to.equal(routerStub);
  });

  describe('GET /api/single-bus-stops', function() {

    it('should route to singleBusStop.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'singleBusStopCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/single-bus-stops/:id', function() {

    it('should route to singleBusStop.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'singleBusStopCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/single-bus-stops', function() {

    it('should route to singleBusStop.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'singleBusStopCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/single-bus-stops/:id', function() {

    it('should route to singleBusStop.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'singleBusStopCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/single-bus-stops/:id', function() {

    it('should route to singleBusStop.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'singleBusStopCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/single-bus-stops/:id', function() {

    it('should route to singleBusStop.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'singleBusStopCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
