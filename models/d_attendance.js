const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('d_attendance', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    monthly_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    wIn: {
      type: DataTypes.DATE,
      allowNull: true
    },
    wOut: {
      type: DataTypes.DATE,
      allowNull: true
    },
    wHour: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'd_attendance',
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
