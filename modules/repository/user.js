const user = require('../../db/models/user');

class User {

  constructor(){

  }

  createUser(username, role){
    return user.create({
      username, role
    })
  }

  deleteUserByUsername(username,){
    return user.destroy({
      where: {username},
      raw: true
    })
  }

  getUserByUsername(username){
    return user.findOne({
      raw: true,
      where: {username}
    });
  }

  getAllUsers(){
    return user.findAll({
      attributes: ['username', 'role'],
      raw: true
    });
  }

}

module.exports = User;