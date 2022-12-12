var userRep = require('../repository/user');
var authRep = require('../repository/auth');

class Login {
  constructor(req){
    this.req = req;
    this.userRep = new userRep();
    this.authRep = new authRep();
  }

  async doLogin(){
    try{
      let user = await this.userRep.getUserByUsername(this.req.body.username);
      let auth = await this.authRep.getPasswordFromUser(user.id);

      if(this.req.body.password == auth.password){
        return new Promise((resolve) => {
          resolve({
            statusCode: 200,
            data: {
              role: user.role
            }
          })
        })
      }
      return new Promise((resolve) => {
        resolve({
          statusCode: 401,
          data: {
            role: 'unauthorized'
          }
        })
      })
    }catch(err){
      return new Promise((resolve) => {
        resolve({
          statusCode: 401,
          data: {
            role: 'unauthorized'
          }
        })
      })
    }
    

    

  }

}

module.exports = Login;