/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('marker', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'name'
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: false,
      unique: true,
      field: 'description'
    }
  }, {
    tableName: 'markers'
  });
};
