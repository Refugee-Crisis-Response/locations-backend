import {city as sql} from '../../config/sql.json';

let mapper;

export default class City {

  constructor (_mapper) {
    mapper = _mapper;
  }

  list (id, done) {
    mapper.client.query(sql.list, [id], done);
  }
}
