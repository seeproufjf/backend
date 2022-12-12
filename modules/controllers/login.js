/* eslint-disable no-unused-vars */
const loginBs = require('../business/login');

class Login {
  doLogin(req, res, next) {
    const bs = new loginBs(req);

    bs.doLogin()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

}

module.exports = Login;