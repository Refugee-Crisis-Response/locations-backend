let cityModel;
let countryCityModel;

const handleListResponse = (err, results, res) => {
  if (err) {
    return res.send(500, err);
  }
  let status = (results.rows.length > 0 ? 200 : 404);
  return res.send(status, results.rows);
};

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

  constructor (_cityModel, _countrycityModel) {
    cityModel = _cityModel;
    countryCityModel = _countrycityModel;
  }

  list (req, res) {
    let country = req.params.country;
    if (isNaN(parseInt(country, 10))) {
      countryCityModel.list(country, (err, results) => {
        handleListResponse(err, results, res);
      });
    } else {
      cityModel.list(country, (err, results) => {
        handleListResponse(err, results, res);
      });
    }
  }

  bounds (req, res) {
    let params = [
      req.query.swlng,
      req.query.swlat,
      req.query.nelng,
      req.query.nelat
    ];
    cityModel.bounds(params, (err, results) => {
      handleBoundsResponse(err, results, res);
    });
  }
}
