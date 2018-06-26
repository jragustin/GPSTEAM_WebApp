/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('site', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    name: {
      type: DataTypes.CHAR(4),
      allowNull: false,
      unique: true,
      field: 'name'
    },
    dateEstablished: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'date_established'
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'latitude'
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      field: 'longitude'
    },
    location: {
      type: DataTypes.STRING(300),
      allowNull: true,
      field: 'location'
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'description'
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
    tableName: 'sites'
  });
};
