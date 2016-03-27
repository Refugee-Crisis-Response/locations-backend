import test from 'tape';
import sinon from 'sinon';
import Controller from '../../../lib/controllers/Cities';

let mocks;

const before = test;
const after = test;

const setupStubs = () => {
  mocks.citymodel = {
    list: sinon.stub(),
    bounds: sinon.stub()
  };
  mocks.countrycitymodel = {
    list: sinon.stub()
  };
  mocks.results = {
    rows: []
  };
  mocks.req = {
    params: {
      country: 'fakecountry'
    },
    query: {
      nelat: '1.234',
      nelng: '2.345',
      swlat: '3.456',
      swlng: '4.567'
    }
  };
  mocks.res = {
    send: sinon.spy()
  };
  mocks.controller = new Controller(mocks.citymodel, mocks.countrycitymodel);
};

before('++++++++++++ Setting up Cities controller tests ++++++++++++', (assert) => {
  mocks = {};
  assert.end();
});

test('*** Cities controller ***', (assert) => {

  assert.test('List Cities', (assert) => {

    assert.test('List cities with id param', (assert) => {
      setupStubs();
      mocks.req.params.country = '1234';
      mocks.controller.list(mocks.req, mocks.res);
      assert.equal(mocks.citymodel.list.calledWith(mocks.req.params.country, sinon.match.func), true);
      assert.end();
    });

    assert.test('List cities with text param', (assert) => {
      setupStubs();
      mocks.controller.list(mocks.req, mocks.res);
      assert.equal(mocks.countrycitymodel.list.calledWith(mocks.req.params.country, sinon.match.func), true);
      assert.end();
    });

    assert.test('List returns data', (assert) => {
      setupStubs();
      let data = {
        rows: [{}]
      };
      mocks.countrycitymodel.list.callsArgWith(1, null, data);
      mocks.controller.list(mocks.req, mocks.res);
      assert.equal(mocks.res.send.calledWith(200, data.rows), true);
      assert.end();
    });

    assert.test('List returns no data', (assert) => {
      setupStubs();
      let data = {
        rows: []
      };
      mocks.countrycitymodel.list.callsArgWith(1, null, data);
      mocks.controller.list(mocks.req, mocks.res);
      assert.equal(mocks.res.send.calledWith(404, data.rows), true);
      assert.end();
    });

    assert.test('List returns error', (assert) => {
      setupStubs();
      let data = {};
      mocks.countrycitymodel.list.callsArgWith(1, data);
      mocks.controller.list(mocks.req, mocks.res);
      assert.equal(mocks.res.send.calledWith(500, data), true);
      assert.end();
    });

    assert.end();
  });

  assert.test('Cities bounds query', (assert) => {

    assert.test('Calls the model', (assert) => {
      setupStubs();
      let params = [mocks.req.query.swlng, mocks.req.query.swlat, mocks.req.query.nelng, mocks.req.query.nelat];
      mocks.controller.bounds(mocks.req, mocks.res);
      let args = mocks.citymodel.bounds.args;
      assert.deepEqual(args[0][0], params);
      assert.equal(typeof args[0][1], 'function');
      assert.end();
    });

    assert.test('Bounds returns data', (assert) => {
      setupStubs();
      let data = {
        rows: [{}]
      };
      mocks.citymodel.bounds.callsArgWith(1, null, data);
      mocks.controller.bounds(mocks.req, mocks.res);
      assert.equal(mocks.res.send.calledWith(200, data.rows), true);
      assert.end();
    });

    assert.test('Bounds returns no data', (assert) => {
      setupStubs();
      let data = {
        rows: []
      };
      mocks.citymodel.bounds.callsArgWith(1, null, data);
      mocks.controller.bounds(mocks.req, mocks.res);
      assert.equal(mocks.res.send.calledWith(404, data.rows), true);
      assert.end();
    });

    assert.test('Bounds returns generic error', (assert) => {
      setupStubs();
      let data = {};
      mocks.citymodel.bounds.callsArgWith(1, data);
      mocks.controller.bounds(mocks.req, mocks.res);
      assert.equal(mocks.res.send.calledWith(500, data), true);
      assert.end();
    });

    assert.test('Bounds returns custom error from the model', (assert) => {
      setupStubs();
      let data = {
        status: 123,
        message: 'fake message'
      };
      mocks.citymodel.bounds.callsArgWith(1, data);
      mocks.controller.bounds(mocks.req, mocks.res);
      let args = mocks.res.send.args;
      assert.equal(args[0][0], data.status);
      assert.deepEqual(args[0][1], { message: data.message });
      assert.end();
    });

    assert.end();
  });

  assert.end();
});

after('++++++++++++ Cleaning up after Cities controller tests ++++++++++++', (assert) => {
  mocks = null;
  assert.end();
});
