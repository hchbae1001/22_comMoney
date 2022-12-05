var DataTypes = require("sequelize").DataTypes;
var _calendar = require("./calendar");
var _notice = require("./notice");
var _user = require("./user");

function initModels(sequelize) {
  var calendar = _calendar(sequelize, DataTypes);
  var notice = _notice(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  notice.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(notice, { as: "notices", foreignKey: "user_id"});

  return {
    calendar,
    notice,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
