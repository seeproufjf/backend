var attendance = require('../repository/attendance');

const moment = require('moment');

class Login {
  constructor(req){
    this.req = req;
    this.rep = new attendance();
  }

  async list(){
    try{
      let attendance = await this.rep.listAll();

      let result = {};

      attendance.forEach(response => {
        if(!result[response.email])
          result[response.email] = 0;

        let value = 5;
        if(response.on_time) value = 10;
        
        result[response.email] += value;
      });
    
      result = Object.fromEntries(
        Object.entries(result).sort(([,a],[,b]) => b-a)
      );

      let array = [];

      for(let i in result){
        array.push({email: i, pontuactiom: result[i]});
      }

      if(result){
        return new Promise((resolve) => {
          resolve({
            statusCode: 200,
            data: {
              result: array
            }
          })
        })
      }
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'error fetching attendance list',
          }
        })
      })
    }catch(err){
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'error fetching attendance list',
            error: err
          }
        })
      })
    }
    

    

  }

  fixDateStart (date){
    let parts = date.split('/');
    let fixed = parts[1] + '/' + parts[0] + '/' + parts[2];
    return fixed;
  }

  fixDatePoint (date){
    let parts = date.split(' ');

    let data = parts[0];

    let splitted = data.split('-');

    let fixed = splitted[0] + '-' + splitted[2] + '-' + splitted[1] +  ' ' + parts[1];

    return fixed;
  }

  async register() {
    try{

      let body = this.req.body;
      
      let start = moment(new Date(this.fixDateStart(body.start)).toISOString()).format('YYYY-MM-DD HH:mm:ss');
      let end = moment(new Date(body.end).toISOString()).format('YYYY-MM-DD HH:mm:ss');
      let meeting_id = body.meeting_id;
      let attendance = body.attendance;

      let results = [];

      let emails = [];
      
      attendance.forEach(point => {
        
        let pointTime;

        try{
          pointTime = this.fixDateStart(point.time);
          pointTime = moment(new Date(pointTime).toISOString()).format('YYYY-MM-DD HH:mm:ss');
        }catch(err){
          pointTime = point.time;
          pointTime = moment(new Date(pointTime).toISOString()).format('YYYY-MM-DD HH:mm:ss');
        }
        
               
        // se chegou dps do final
        if(moment(pointTime).diff(end, 'minutes') > 1) { 
          1
        }
        // se chegou antes que 5 min do inicio
        else if(moment(start).diff(pointTime, 'minutes') > 5) { 
          2
        }
        //se chegou atrasado
        else if(moment(pointTime).diff(start, 'minutes') > 5 && emails.indexOf(point.email) == -1){
          emails.push(point.email);
          results.push({email: point.email, on_time: 0, meeting_id})
        }

        // se chegou a tempo
        else{
          if(emails.indexOf(point.email) == -1){
            emails.push(point.email);
            results.push({email: point.email, on_time: 1, meeting_id})
          }
        }
        
      })
      

      this.rep.bulkInsert(results);

      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          data: {
            result: 'success',
          }
        })
      })

      


      
    }catch(err){
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'error updating attendance list',
            error: err
          }
        })
      })
    }
  }

  async clear(){
    try{
      await this.rep.clear();
      
      return new Promise((resolve) => {
        resolve({
          statusCode: 200,
          data: {
            result: 'success'
          }
        })
      })
      
    }catch(err){
      return new Promise((resolve) => {
        resolve({
          statusCode: 400,
          data: {
            result: 'error clearing gamification list',
            error: err
          }
        })
      })
    }
  }
}

module.exports = Login;