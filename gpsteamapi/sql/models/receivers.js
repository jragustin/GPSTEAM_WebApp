/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('receiver', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    serialNumber: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      field: 'serial_number'
    },
    partNumber: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: 'part_number'
    },
    retirementDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'retirement_date'
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt'
    }
  }, {
    tableName: 'receivers'
  });
};
