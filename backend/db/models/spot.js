'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsToMany(
        models.User,
        { through: models.Booking } 
      );

      // Spot.hasMany(
      //   models.Image, {
      //     foreignKey: 'spotId', 
      //     onDelete: 'CASCADE', 
      //     hooks: true
      // });

      // Spot.hasMany(
      //   models.Review, {
      //     foreignKey: 'spotId', 
      //     onDelete: 'CASCADE', 
      //     hooks: true
      // });




    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: -90,
        max: 90
      }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        min: -180,
        max: 180
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,49],
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      }
    },
    previewImage: {
      type: DataTypes.STRING,
    },

  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};