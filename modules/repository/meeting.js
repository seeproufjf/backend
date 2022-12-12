const meeting = require('../../db/models/meeting');

class Auth {

  constructor(){

  }

  createMeeting(title, online, local, when, form){
    return meeting.create({title, online, local, when, form});
  }

  deleteMeetingById(id){
    return meeting.destroy({where: {id}});
  }

  listMeetings(){
    return meeting.findAll({raw: true});
  }


}

module.exports = Auth;