const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('notice', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    user_dept: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    user_position: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    user_name: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    subject: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    text: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    img: {
      type: DataTypes.CHAR(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'notice',
    timestamps: true,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "notice_user",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
};
