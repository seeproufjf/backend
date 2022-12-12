const { Model, DataTypes } = require('sequelize');

class Auth extends Model {
  static init(sequelize){
    super.init({
      user_id: DataTypes.INTEGER,
      password: DataTypes.TEXT,
    }, {
      sequelize
    })
  }
}

module.exports = Auth;