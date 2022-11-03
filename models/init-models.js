var DataTypes = require("sequelize").DataTypes;
var _d_attendance = require("./d_attendance");
var _dept = require("./dept");
var _m_attendance = require("./m_attendance");
var _position = require("./position");
var _user = require("./user");

function initModels(sequelize) {
  var d_attendance = _d_attendance(sequelize, DataTypes);
  var dept = _dept(sequelize, DataTypes);
  var m_attendance = _m_attendance(sequelize, DataTypes);
  var position = _position(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    d_attendance,
    dept,
    m_attendance,
    position,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
