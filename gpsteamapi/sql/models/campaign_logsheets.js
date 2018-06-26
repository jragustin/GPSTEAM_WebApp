/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('campaignLogsheet', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'date'
    },
    heightNorthMeters: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'height_north_meters'
    },
    heightEastMeters: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'height_east_meters'
    },
    heightSouthMeters: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'height_south_meters'
    },
    heightWestMeters: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      field: 'height_west_meters'
    },
    timeStart: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'time_start'
    },
    timeEnd: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'time_end'
    },
    failureTime: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'failure_time'
    },
    azimuth: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'azimuth'
    },
    notes: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      field: 'notes'
    },
    // createdAt: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    //   field: 'createdAt'
    // }
  }, {
    tableName: 'campaign_logsheets'
  });
};
