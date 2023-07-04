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
      User.hasMany(models.Order, { foreignKey: 'UserId' });
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
    imageUrl: {
      type: DataTypes.STRING,
      defaultValue: "https://wallpapers.com/images/hd/b-w-power-from-chainsaw-man-pmy1zttfrb7sauer.jpg"
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate(user => user.uuid = uuidv4());

  return User;
};