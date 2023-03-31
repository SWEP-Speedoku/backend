const dbConfig = require("../../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.gamelevels = require("./gamelevel.model.js")(sequelize, Sequelize);
db.gamesaves = require("./gamesave.model.js")(sequelize, Sequelize);
db.leaderboardEntries = require("./leaderboardEntry.model.js")(sequelize, Sequelize);

module.exports = db;

