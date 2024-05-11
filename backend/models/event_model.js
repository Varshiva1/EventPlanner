const { Model, DataTypes } = require('sequelize');


class Event extends Model {
  static init(sequelize) {
    super.init({
      name: {
        type: DataTypes.STRING(225),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(255),
      },
      date: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('NOW()'),
        allowNull: false,
      },
      time: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING(255),
      },
      guests: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
      notifications: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue('notifications'));
        },
        set: function (value) {
          this.setDataValue('notifications', JSON.stringify(value));
        },
      },
      files: {
        type: DataTypes.TEXT,
        get: function () {
          return JSON.parse(this.getDataValue('files'));
        },
        set: function (value) {
          this.setDataValue('files', JSON.stringify(value));
        },
      },
    }, {
      sequelize, // This is the DataTypes instance that represents a connection to the DB
      modelName: 'Event',
      tableName: 'event',
      timestamps: false, // Add this only if you are handling timestamps manually
    });
  }
}

module.exports = Event;