// db_connect.js

const { Sequelize } = require('sequelize');
const credential = require('../config/db_config.js');
const Event = require('../models/event_model.js');

const database = credential.DB;
const username = credential.USER;
const password = credential.PASSWORD;
const host = credential.HOST;
const port = Number(credential.port);
const dialect = credential.dialect;
// const dialectOptions = credential.dialectOptions;


async function loadSequelize() {
    const sequelize = new Sequelize(database, username, password, {
        host: host,
        dialect: dialect, // Use 'postgres' as the dialect for PostgreSQL
        port: port, // Default port for PostgreSQL, change if your DB uses a different port
        logging: false, // Set to console.log to see the raw SQL queries
        pool: {
            max: 2, // Adjust based on your DB's capacity and Lambda usage
            min: 0,
            acquire: 30000,
            idle: 10000,
            logging: console.log, // or custom logging function
        },
        // dialectOptions: dialectOptions,
        timezone: 'Asia/Kolkata',
        // Additional options as needed
    });
    await sequelize.authenticate();

    return sequelize;
}

let sequelize = null;

async function connectSequelizeDB() {
    try {
        console.log(sequelize);
        if (!sequelize) {
            console.log('Initializing new Sequelize connection...');
            sequelize = await loadSequelize();
            console.log("sequelize connected successfully");
            // console.log("🚀 ~ connectSequelizeDB ~ sequelize:", sequelize)
            // Event.sync()
            Event.init(sequelize)
            await sequelize.sync();

            return sequelize
        } else {
          // restart connection pool to ensure connections are not re-used across invocations
          sequelize.connectionManager.initPools();
          
          // restore `getConnection()` if it has been overwritten by `close()`
          if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
          }
          return sequelize
        }
      } catch (error) {
        console.log("🚀 ~ connectDBPG ~ error:", error)
        throw error
      }
}

async function closeDatabaseConnection() {
    try {
        await sequelize.connectionManager.close();
        console.log('Connection to the database has been successfully closed.');
    } catch (error) {
        console.error('Error occurred while closing the database connection:', error);
    }
}

module.exports = { connectSequelizeDB, closeDatabaseConnection };
