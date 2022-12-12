/* eslint-disable no-unused-vars */
const meetingBs = require('../business/meeting');

class Meeting {
  create(req, res, next) {
    const bs = new meetingBs(req);

    bs.create()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

  delete(req, res, next) {
    const bs = new meetingBs(req);

    bs.delete()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }
  
  list(req, res, next) {
    const bs = new meetingBs(req);

    bs.list()
      .then(result => {
        res.status(result.statusCode).json(result.data);
      })
  }

}

module.exports = Meeting;