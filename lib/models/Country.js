import {country as sql} from '../../config/sql.json';

let mapper;

export default class Country {

  constructor (_mapper) {
    mapper = _mapper;
  }

  list (done) {
    mapper.client.query(sql.list, null, done);
  }

  get(country, done) {
    let _sql;
    if (isNaN(parseInt(country, 10))) {
      _sql = sql.get.byText;
    } else {
      _sql = sql.get.byId;
    }
    mapper.client.query(_sql, [country], done);
  }
}
