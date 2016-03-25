
let model;

export default class Country {

  constructor (_model) {
    model = _model;
  }

  list (req, res) {
    model.list((err, results) => {
      if (err) {
        return res.send(500, err);
      }
      let status = (results.rows.length > 0 ? 200 : 404);
      return res.send(status, results.rows);
    });
  }
}
