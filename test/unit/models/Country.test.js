import test from 'tape';
import sinon from 'sinon';
import pg from 'pg';
import Model from '../../../lib/models/Country';

let mocks;

const before = test;
const after = test;

const mockMapper = () => {
  mocks.mapper = {
    query: sinon.stub()
  };
};

before('++++++++++++ Setting up Country model tests ++++++++++++', (assert) => {
  mocks = {};
  mocks.listSQL = 'select name, slub from countries';
  assert.end();
});

test('*** List countries ***', (assert) => {

  assert.test('Sends the query', (assert) => {
    mockMapper();
    let country = new Model(mocks.mapper);
    let done = sinon.spy();
    country.list(done);
    let args = mocks.mapper.query.args;
    assert.equal(args[0][0], mocks.listSQL);
    assert.equal(args[0][1], null);
    assert.equal(args[0][2], done);
    assert.end();
  });
  assert.end();
});

after('++++++++++++ Cleaning up after Country model tests ++++++++++++', (assert) => {
  mocks = null;
  assert.end();
});
