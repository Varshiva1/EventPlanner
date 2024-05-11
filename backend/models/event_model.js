const Sequelize = require('sequelize');

const sequelize = new Sequelize('event_management', 'your_username', 'your_password', {
  host: 'localhost',
  dialect: 'mysql',
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
    type: Sequelize.STRING, // Change to STRING
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
    type: Sequelize.JSON,
  },
  notifications: {
    type: Sequelize.JSON,
  },
  files: {
    type: Sequelize.JSON,
  },
});

module.exports = Event;
