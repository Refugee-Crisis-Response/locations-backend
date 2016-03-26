
let mapper;

export default class Country {

  constructor (_mapper) {
    mapper = _mapper;
  }

  list (done) {
    mapper.client.query('select id, name, slug from countries', null, done);
  }

  get(id, done) {
    let sql;
    if (isNaN(parseInt(id, 10))) {
      sql = 'select * from countries where lower(name) = lower($1) or lower(slug) = lower($1)';
    } else {
      sql = 'select id, name, slug from countries where id = $1';
    }
    mapper.client.query(sql, [id], done);
  }
}
