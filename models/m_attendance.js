const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_attendance', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    wSum: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    yearMonth: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'm_attendance',
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
