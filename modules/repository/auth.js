const auth = require('../../db/models/auth');

class Auth {

  constructor(){

  }

  createAuth(user_id, password){
    return auth.create({user_id, password});
  }

  deleteAuthByUserId(user_id){
    return auth.destroy({where: {user_id}});
  }

  getPasswordFromUser(user_id){
    return auth.findOne({
      raw: true,
      where: {user_id}
    });
  }

}

module.exports = Auth;