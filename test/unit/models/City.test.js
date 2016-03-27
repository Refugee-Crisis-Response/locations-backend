import test from 'tape';
import sinon from 'sinon';
import {city as sql} from '../../../config/sql.json';
import Model from '../../../lib/models/City';

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

before('++++++++++++ Setting up City model tests ++++++++++++', (assert) => {
  mocks = {};
  assert.end();
});

test('*** List cities ***', (assert) => {

  assert.test('Sends the query', (assert) => {

    setMocks();
    let city = new Model(mocks.mapper);
    city.list(mocks.id, mocks.done);
    assert.equal(mocks.mapper.client.query.calledWith(sql.list, [mocks.id], mocks.done), true);
    assert.end();
  });
  assert.end();
});

after('++++++++++++ Cleaning up after Country model tests ++++++++++++', (assert) => {
  mocks = null;
  assert.end();
});
