const { Model, DataTypes } = require('sequelize');

class User extends Model {
  static init(sequelize){
    super.init({
      username: DataTypes.TEXT,
      role: DataTypes.TEXT
    }, {
      sequelize
    })
  }
}

module.exports = User;