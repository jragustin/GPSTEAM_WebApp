/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('personType', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    type: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'type'
    },
    description: {
      type: DataTypes.STRING(300),
      allowNull: false,
      field: 'description'
    }
  }, {
    tableName: 'person_types'
  });
};
