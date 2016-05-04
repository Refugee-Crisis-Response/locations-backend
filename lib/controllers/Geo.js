let geoModel;

const handleBoundsResponse = (err, results, res) => {
  if (err) {
    if (err.status && err.message) {
      return res.send(err.status, {
        message: err.message
      });
    } else {
      return res.send(500, err);
    }
  }
  let status = (results.rows.length > 0 ? 200 : 404);
  res.send(status, results.rows);
};

export default class Cities {

  constructor (_geoModel) {
    geoModel = _geoModel;
  }

  bounds (req, res) {
    let params = [
      req.query.swlng,
      req.query.swlat,
      req.query.nelng,
      req.query.nelat
    ];
    geoModel.bounds(params, (err, results) => {
      handleBoundsResponse(err, results, res);
    });
  }
}
