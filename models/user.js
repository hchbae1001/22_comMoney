const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    name: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    nickName: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    password: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    phone: {
      type: DataTypes.CHAR(30),
      allowNull: true
    },
    zip: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    addr1: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    addr2: {
      type: DataTypes.CHAR(40),
      allowNull: true
    },
    position: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    img: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    dept: {
      type: DataTypes.CHAR(20),
      allowNull: true
    },
    auth: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
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
    ]
  });
};
