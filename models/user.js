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
      type: DataTypes.STRING(45),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    position_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    dept_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    memo: {
      type: DataTypes.STRING(200),
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
