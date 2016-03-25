import test from 'tape';
import sinon from 'sinon';
import Controller from '../../../lib/controllers/Countries';

let mocks;

const before = test;
const after = test;

const setupStubs = () => {
  mocks.model = {
    list: sinon.stub()
  };
  mocks.results = {
    rows: []
  };
  mocks.req = {};
  mocks.res = {
    send: sinon.spy()
  };
};

before('++++++++++++ Setting up Country controller tests ++++++++++++', (assert) => {
  mocks = {};
  assert.end();
});

test('*** Listing countries ***', (assert) => {

  assert.test('List of countries found', (assert) => {
    setupStubs();
    mocks.results.rows.push({});
    mocks.model.list.callsArgWith(0, null, mocks.results);
    let countries = new Controller(mocks.model);
    countries.list(mocks.req, mocks.res);
    assert.equal(mocks.res.send.calledWith(200, mocks.results.rows), true);
    assert.end();
  });

  assert.test('No countries found', (assert) => {
    setupStubs();
    mocks.model.list.callsArgWith(0, null, mocks.results);
    let countries = new Controller(mocks.model);
    countries.list(mocks.req, mocks.res);
    assert.equal(mocks.res.send.calledWith(404, mocks.results.rows), true);
    assert.end();
  });

  assert.test('Query throws error', (assert) => {
    setupStubs();
    let error = {};
    mocks.model.list.callsArgWith(0, error);
    let countries = new Controller(mocks.model);
    countries.list(mocks.req, mocks.res);
    assert.equal(mocks.res.send.calledWith(500, error), true);
    assert.end();
  });

  assert.end();
});

after('++++++++++++ Cleaning up after Country controller tests ++++++++++++', (assert) => {
  mocks = null;
  assert.end();
});
