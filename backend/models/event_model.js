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
        defaultValue: DataTypes.NOW, // Use DataTypes.NOW for the default value
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
        type: DataTypes.TEXT, // Store as TEXT
        get() {
          const value = this.getDataValue('guests');
          return value ? JSON.parse(value) : []; // Parse JSON string when getting value
        },
        set(value) {
          this.setDataValue('guests', JSON.stringify(value)); // Serialize array to JSON string when setting value
        },
      },
      notifications: {
        type: DataTypes.TEXT, // Use DataTypes.TEXT for large JSON data
        get() {
          return JSON.parse(this.getDataValue('notifications'));
        },
        set(value) {
          this.setDataValue('notifications', JSON.stringify(value));
        },
      },
      files: {
        type: DataTypes.TEXT, // Use DataTypes.TEXT for large JSON data
        get() {
          return JSON.parse(this.getDataValue('files'));
        },
        set(value) {
          this.setDataValue('files', JSON.stringify(value));
        },
      },
    }, {
      sequelize,
      modelName: 'Event',
      tableName: 'events', // Adjust the table name to match your MySQL table name
      timestamps: false, // Add this only if you are handling timestamps manually
    });
  }
}

module.exports = Event;