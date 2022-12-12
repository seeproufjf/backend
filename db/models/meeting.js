const { Model, DataTypes } = require('sequelize');

class Meeting extends Model {
  static init(sequelize){
    super.init({
      title: DataTypes.TEXT,
      online: DataTypes.BOOLEAN,
      local: DataTypes.TEXT,
      when: DataTypes.TEXT,
      form: DataTypes.TEXT
    }, {
      sequelize
    })
  }
}

module.exports = Meeting;