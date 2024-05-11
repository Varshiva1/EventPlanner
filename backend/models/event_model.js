const Sequelize = require('sequelize');
const sequelize = new Sequelize('event_management',  'postgres', 'null', {
  host: 'localhost',
  dialect: 'postgres',
});

const Event = sequelize.define('event', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  time: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  duration: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
  },
  guests: {
    type: Sequelize.TEXT,
    get: function() {
      return JSON.parse(this.getDataValue('guests'));
    },
    set: function(value) {
      this.setDataValue('guests', JSON.stringify(value));
    },
  },
  notifications: {
    type: Sequelize.TEXT,
    get: function() {
      return JSON.parse(this.getDataValue('notifications'));
    },
    set: function(value) {
      this.setDataValue('notifications', JSON.stringify(value));
    },
  },
  files: {
    type: Sequelize.TEXT,
    get: function() {
      return JSON.parse(this.getDataValue('files'));
    },
    set: function(value) {
      this.setDataValue('files', JSON.stringify(value));
    },
  },
});

module.exports = Event;