/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('antennaModel', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      field: 'name'
    }
  }, {
    tableName: 'antenna_models'
  });
};
