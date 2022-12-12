const attendance = require('../../db/models/attendance');

class Attendance {

  constructor(){

  }

  listAll(){
    return attendance.findAll({
      raw: true
    });
  }

  bulkInsert(results){
    return attendance.bulkCreate(results);
  }

  clear(){
    return attendance.destroy({
      where: {},
      truncate: true
    });
  }

}

module.exports = Attendance;