
let mapper;

export default class Country {

  constructor (_mapper) {
    mapper = _mapper;
  }

  list (done) {
    mapper.client.query('select name, slug from countries', null, done);
  }
}
