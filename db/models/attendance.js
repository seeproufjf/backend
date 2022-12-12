const { Model, DataTypes } = require('sequelize');

class Attendance extends Model {
  static init(sequelize){
    super.init({
      email: DataTypes.STRING,
      meeting_id: DataTypes.INTEGER,
      on_time: DataTypes.BOOLEAN
    }, {
      sequelize
    })
  }
}

module.exports = Attendance;