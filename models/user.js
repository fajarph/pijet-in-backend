'use strict';

const { v4: uuidv4 } = require('uuid');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    uuid: DataTypes.STRING,
    nama: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: "Aktif"
    },
    nik: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    noTelp: DataTypes.STRING,
    tglLahir: DataTypes.STRING,
    tempatLahir: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user => user.uuid = uuidv4());

  return User;
};