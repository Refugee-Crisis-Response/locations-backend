
let mapper;

export default class Country {

  constructor (_mapper) {
    mapper = _mapper;
  }

  list (done) {
    mapper.query('select name, slub from countries', null, done);
  }
}
