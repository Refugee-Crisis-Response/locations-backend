let cityModel;
let countryCityModel;

const handleResponse = (err, results, res) => {
  if (err) {
    return res.send(500, err);
  }
  let status = (results.rows.length > 0 ? 200 : 404);
  return res.send(status, results.rows);
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
        handleResponse(err, results, res);
      });
    } else {
      cityModel.list(country, (err, results) => {
        handleResponse(err, results, res);
      });
    }
  }
}
