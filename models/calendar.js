const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('calendar', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    user_name: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    user_dept: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    user_position: {
      type: DataTypes.CHAR(11),
      allowNull: true
    },
    subject: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    text: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'calendar',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
