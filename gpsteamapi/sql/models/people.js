/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('person', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'id'
    },
    firstName: {
      type: DataTypes.STRING(35),
      allowNull: false,
      field: 'first_name'
    },
    lastName: {
      type: DataTypes.STRING(35),
      allowNull: false,
      field: 'last_name'
    },
    nickName: {
      type: DataTypes.STRING(35),
      allowNull: false,
      field: 'nick_name'
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'birthdate'
    },
    // profilePhoto: {
    //   type: "BLOB",
    //   allowNull: true,
    //   field: 'profile_photo'
    // }
  }, {
    tableName: 'people'
  });
};
