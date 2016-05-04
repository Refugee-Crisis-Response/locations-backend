import {geo as sql} from '../../config/sql.json';
import {models as modelMessages} from '../../config/messages.json';

let mapper;
let messages;

const validateBoundsParams = (params) => {
  if (! params.length || params.length < 4) {
    return messages['400'];
  }
  for (let i = 0, len = params.length; i < len; i++) {
    if (isNaN(parseFloat(params[i]))) {
      return messages['422'];
    }
  }
  return null;
};

export default class Geo {

  constructor (_mapper) {
    mapper = _mapper;
    messages = modelMessages.bounds;
  }

  bounds (params, done) {
    let valid = validateBoundsParams(params);
    if (valid) {
      return done(valid);
    }
    mapper.client.query(sql.bounds, params, done);
  }
}
