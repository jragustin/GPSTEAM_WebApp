/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('surveyType', {
    id: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      primaryKey: true,
      field: 'id'
    },
    type: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'type'
    }
  }, {
    tableName: 'survey_types'
  });
};
