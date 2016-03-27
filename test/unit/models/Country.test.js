import test from 'tape';
import sinon from 'sinon';
import {country as sql} from '../../../config/sql.json';
import Model from '../../../lib/models/Country';

let mocks;

const before = test;
const after = test;

const mockMapper = () => {
  mocks.mapper = {
    client: {
      query: sinon.stub()
    }
  };
};

before('++++++++++++ Setting up Country model tests ++++++++++++', (assert) => {
  mocks = {};
  assert.end();
});

test('*** List countries ***', (assert) => {

  assert.test('Sends the query', (assert) => {
    mockMapper();
    let country = new Model(mocks.mapper);
    let done = sinon.spy();
    country.list(done);
    let args = mocks.mapper.client.query.args;
    assert.equal(args[0][0], sql.list);
    assert.equal(args[0][1], null);
    assert.equal(args[0][2], done);
    assert.end();
  });

  //assert.end();
});

test('*** Get country ***', (assert) => {

  assert.test('Get by Id', (assert) => {
    mockMapper();
    let country = new Model(mocks.mapper);
    let done = sinon.spy();
    let id = '1234';
    country.get(id, done);
    let args = mocks.mapper.client.query.args;
    assert.equal(args[0][0], sql.get.byId);
    assert.deepEqual(args[0][1], [id]);
    assert.equal(args[0][2], done);
    assert.end();
  });

  assert.test('Get by string', (assert) => {
    mockMapper();
    let country = new Model(mocks.mapper);
    let done = sinon.spy();
    let id = 'fakestring';
    country.get(id, done);
    let args = mocks.mapper.client.query.args;
    assert.equal(args[0][0], sql.get.byText);
    assert.deepEqual(args[0][1], [id]);
    assert.equal(args[0][2], done);
    assert.end();
  });

  assert.end();
});

after('++++++++++++ Cleaning up after Country model tests ++++++++++++', (assert) => {
  mocks = null;
  assert.end();
});
