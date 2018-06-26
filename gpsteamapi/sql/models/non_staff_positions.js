/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nonStaffPosition', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'name'
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      field: 'description'
    }
  }, {
    tableName: 'non_staff_positions'
  });
};
