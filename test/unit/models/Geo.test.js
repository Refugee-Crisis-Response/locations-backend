import test from 'tape';
import sinon from 'sinon';
import {geo as sql} from '../../../config/sql.json';
import {models} from '../../../config/messages.json';
import Model from '../../../lib/models/Geo';

let mocks;

const before = test;
const after = test;

const setMocks = () => {
  mocks.mapper = {
    client: {
      query: sinon.stub()
    }
  };
  mocks.done = sinon.spy();
  mocks.id = 'fake id';
};

before('++++++++++++ Setting up Geo model tests ++++++++++++', (assert) => {
  mocks = {};
  assert.end();
});

test('Geo bounds query', (assert) => {

  assert.test('Valid params', (assert) => {
    setMocks();
    let params = ['1.2345', '2.6543', '3.7654', '4.4567'];
    let geo = new Model(mocks.mapper);
    geo.bounds(params, mocks.done);
    assert.equal(mocks.mapper.client.query.calledWith(sql.bounds, params, mocks.done), true);
    assert.end();
  });

  assert.test('Insufficient number of params in request', (assert) => {
    setMocks();
    let params = ['1.234', '2.345', '3.456'];
    let geo = new Model(mocks.mapper);
    geo.bounds(params, mocks.done);
    assert.equal(mocks.mapper.client.query.called, false);
    assert.equal(mocks.done.calledWith(models.bounds['400']), true);
    assert.end();
  });

  assert.test('One or more params are not numbers/floats', (assert) => {
    setMocks();
    let params = ['1.234', '2.345', '3.456', 'fake'];
    let geo = new Model(mocks.mapper);
    geo.bounds(params, mocks.done);
    assert.equal(mocks.mapper.client.query.called, false);
    assert.equal(mocks.done.calledWith(models.bounds['422']), true);
    assert.end();
  });

  assert.end();
});

after('++++++++++++ Cleaning up after Geo model tests ++++++++++++', (assert) => {
  mocks = null;
  assert.end();
});
