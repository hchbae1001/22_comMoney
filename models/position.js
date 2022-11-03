const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('position', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    position: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    payPerHour: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payPerMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    payPerYear: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'position',
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
