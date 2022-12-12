const Sequelize = require('sequelize');
const config = require('../config/database.js');

const user = require('./models/user');
const auth = require('./models/auth');
const meeting = require('./models/meeting');
const attendance = require('./models/attendance');

const connection = new Sequelize(config);

user.init(connection);
auth.init(connection);
meeting.init(connection);
attendance.init(connection);

module.exports = connection;