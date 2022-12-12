const userCtrl = require('../modules/controllers/user.js');
const loginCtrl = require('../modules/controllers/login.js');
const meetingCtrl = require('../modules/controllers/meeting.js');
const attendanceCtrl = require('../modules/controllers/attendance.js');

const user = new userCtrl();
const login = new loginCtrl();
const meeting = new meetingCtrl();
const attendance = new attendanceCtrl();

module.exports = function(app) {

  app.route('/api/login')
    .post(
      login.doLogin
    )

  app.route('/api/user')
    .post(
      user.create
    )
    .delete(
      user.delete
    )
    .get(
      user.getAll
    )

  app.route('/api/meeting')
    .post(
      meeting.create
    )
    .get(
      meeting.list
    )
  app.route('/api/meeting/:id')  
    .delete(
      meeting.delete
    )

  app.route('/api/attendance')
    .get(
      attendance.list
    )
    .post(
      attendance.register
    )
    .delete(
      attendance.clear
    )
}