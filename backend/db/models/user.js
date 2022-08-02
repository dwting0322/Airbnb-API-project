'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName } = this; // context will be the User instance
      return { id, firstName, lastName, email, username };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password,
        this.hashedPassword.toString());
    }

    static associate(models) {
      User.belongsToMany(
        models.Spot,
        {as: 'Owner', through: models.Booking }
      );

      User.hasMany(
        models.Review, {
          foreignKey: 'userId', 
          onDelete: 'CASCADE', 
          hooks: true
      });
      
      User.hasMany(
        models.Image, {
          foreignKey: 'userId', 
          onDelete: 'CASCADE', 
          hooks: true
      });

  
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

  };

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        },
        
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 50]
        },
        
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [3, 256]
        }
      },

      token: {
        type: DataTypes.STRING,
        unique: true
      },

      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60]
        }
      },
      
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "createdAt", "updatedAt"]
        }
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt"] }
        },
        loginUser: {
          attributes: {exclude: ["createdAt", "updatedAt"]}
        }
      }
    }
  );
  return User;
};