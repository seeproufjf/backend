var meetingRep = require('../repository/meeting');


class Login {
  constructor(req){
    this.req = req;
    this.rep = new meetingRep();
  }

  async create(){
    try{
      let body = this.req.body;
      let title = body.title;
      let online = body.online;
      let local = body.local;
      let when = body.when;
      let form = body.form;

      let meeting = await this.rep.createMeeting(title, online, local, when, form);

      if(meeting){
        return new Promise((resolve) => {
          resolve({
            statusCode: 200,
            data: {
              result: 'success',
              info: meeting.dataValues
            }
          })
        })
      }
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'could not create meeting'
          }
        })
      })
    }catch(err){
      console.log('\n','----------->err:\n', (err), '\n','<-----------FIM\n\n');
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'could not create meeting',
            error: err
          }
        })
      })
    }
    

    

  }

  async delete(){
    try{
      let id = this.req.params.id;

      let result = await this.rep.deleteMeetingById(id);

      if(result){
        return new Promise((resolve) => {
          resolve({
            statusCode: 200,
            data: {
              result: 'success'
            }
          })
        })
      }
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'could not delete meeting'
          }
        })
      })
    }catch(err){
      console.log('\n','----------->err:\n', (err), '\n','<-----------FIM\n\n');
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'could not delete meeting',
            error: err
          }
        })
      })
    }
    

    

  }

  async list(){
    try{
      let result = await this.rep.listMeetings();

      if(result){
        return new Promise((resolve) => {
          resolve({
            statusCode: 200,
            data: {
              result
            }
          })
        })
      }
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'could not list meetings'
          }
        })
      })
    }catch(err){
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'could not list meetings',
            error: err
          }
        })
      })
    }
    

    

  }

}

module.exports = Login;