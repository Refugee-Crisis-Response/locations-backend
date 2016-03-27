import test from 'tape';
import sinon from 'sinon';
import Controller from '../../../lib/controllers/Cities';

let mocks;

const before = test;
const after = test;

const setupStubs = () => {
  mocks.citymodel = {
    list: sinon.stub()
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

after('++++++++++++ Cleaning up after Cities controller tests ++++++++++++', (assert) => {
  mocks = null;
  assert.end();
});
