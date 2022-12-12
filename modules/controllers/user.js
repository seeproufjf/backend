/* eslint-disable no-unused-vars */
const userBs = require('../business/user');

class User {
  create(req, res, next) {
    const bs = new userBs(req);

    bs.create()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

  delete(req, res, next) {
    const bs = new userBs(req);

    bs.delete()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

  getAll(req, res, next) {
    const bs = new userBs(req);

    bs.getAll()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

}

module.exports = User;