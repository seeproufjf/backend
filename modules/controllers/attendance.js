/* eslint-disable no-unused-vars */
const attendanceBs = require('../business/attendance');

class Attendance {
  list(req, res, next) {
    const bs = new attendanceBs(req);

    bs.list()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

  register(req, res, next) {
    const bs = new attendanceBs(req);

    bs.register()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

  clear(req, res, next) {
    const bs = new attendanceBs(req);

    bs.clear()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

}

module.exports = Attendance;