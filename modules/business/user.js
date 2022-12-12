var userRep = require('../repository/user');
var authRep = require('../repository/auth');

class User {
  constructor(req){
    this.req = req;
    this.rep = new userRep();
    this.authRep = new authRep();
  }

  async create(){
    try{
      let body = this.req.body;
      let role = body.role;
      let username = body.username;
      let password = body.password;

      let user = (await this.rep.createUser(username, role)).dataValues;
      let auth = await this.authRep.createAuth(user.id, password);

      if(auth){
        return new Promise((resolve) => {
          resolve({
            statusCode: 200,
            data: {
              result: 'success'
            }
          })
        })
      }else{
        return new Promise((resolve) => {
          resolve({
            statusCode: 401,
            data: {
              result: 'could not create user'
            }
          })
        })
      }
    }catch(err){
      return new Promise((resolve) => {

        let error = 'Erro desconhecido';

        if(err.name == 'SequelizeUniqueConstraintError') error = 'Usuário já existente';



        resolve({
          statusCode: 401,
          data: {
            result: 'could not create user',
            error
          }
        })
      })
    }
  }

  async delete(){
    try{
      let body = this.req.body;
      let username = body.username;

      let user = await this.rep.getUserByUsername(username);

      await this.rep.deleteUserByUsername(username);
      await this.authRep.deleteAuthByUserId(user.id);

      if(user){
        return new Promise((resolve) => {
          resolve({
            statusCode: 200,
            data: {
              result: 'success'
            }
          })
        })
      }else{
        return new Promise((resolve) => {
          resolve({
            statusCode: 401,
            data: {
              result: 'could not delete user'
            }
          })
        })
      }
    }catch(err){
      return new Promise((resolve) => {

        let error = 'Erro desconhecido';

        resolve({
          statusCode: 401,
          data: {
            result: 'could not delete user',
            error
          }
        })
      })
    }
  }

  async getAll(){
    try{

      let users = await this.rep.getAllUsers();

      if(users){
        return new Promise((resolve) => {
          resolve({
            statusCode: 200,
            data: {
              users
            }
          })
        })
      }else{
        return new Promise((resolve) => {
          resolve({
            statusCode: 401,
            data: {
              result: 'could not list users'
            }
          })
        })
      }
    }catch(err){
      return new Promise((resolve) => {

        let error = 'Não foi possível listar os usuários';

        resolve({
          statusCode: 401,
          data: {
            result: 'could not delete users',
            error
          }
        })
      })
    }
  }

}

module.exports = User;