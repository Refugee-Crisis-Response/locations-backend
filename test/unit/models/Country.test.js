import test from 'tape';
import sinon from 'sinon';
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
  mocks.listSQL = 'select id, name, slug from countries';
  mocks.getSQLId = 'select id, name, slug from countries where id = $1';
  mocks.getSQLText = 'select * from countries where lower(name) = lower($1) or lower(slug) = lower($1)';
  assert.end();
});

test('*** List countries ***', (assert) => {

  assert.test('Sends the query', (assert) => {
    mockMapper();
    let country = new Model(mocks.mapper);
    let done = sinon.spy();
    country.list(done);
    let args = mocks.mapper.client.query.args;
    assert.equal(args[0][0], mocks.listSQL);
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
    assert.equal(args[0][0], mocks.getSQLId);
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
    assert.equal(args[0][0], mocks.getSQLText);
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
