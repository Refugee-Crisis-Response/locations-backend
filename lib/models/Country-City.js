import {countrycity as sql} from '../../config/sql.json';

let mapper;

export default class CountryCity {

  constructor (_mapper) {
    mapper = _mapper;
  }

  list (id, done) {
    mapper.client.query(sql.list, [id], done);
  }
}
