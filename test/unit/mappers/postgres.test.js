import test from 'tape';
import sinon from 'sinon';
import pg from 'pg';
import Mapper from '../../../lib/mappers/postgres';

let mocks;

const before = test;
const after = test;

const setupStubs = () => {
  mocks = {};
  mocks.client = {
    connect: sinon.spy()
  };
  mocks.pg = sinon.stub(pg, 'Client').returns(mocks.client);
  mocks.mapper = new Mapper(mocks.connStr);
};

const teardownStubs = () => {
  pg.Client.restore();
  mocks = null;
};

before('Running setup for postgres mapper', (assert) =>  {
  setupStubs();
  assert.end();
});

test('*** New postgres mapper ***', (assert) => {

  assert.test('Creates pg client', (assert) => {
    assert.equal(mocks.pg.calledWith(mocks.connStr), true);
    assert.end();
  });

  assert.test('Creates a connection', (assert) => {
    assert.equal(mocks.client.connect.called, true);
    assert.end();
  });

  assert.test('Exposes the pg.client', (assert) => {
    assert.equal(mocks.mapper.client, mocks.client);
    assert.end();
  });

  assert.end();
});

after('Cleanup after postgres mapper', (assert) => {
  teardownStubs();
  assert.end();
});
