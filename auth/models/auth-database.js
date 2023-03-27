const authdbConfig = require("../config/auth-db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(authdbConfig.DB, authdbConfig.USER, authdbConfig.PASSWORD, {
  host: authdbConfig.HOST,
  dialect: authdbConfig.dialect,

  pool: {
    max: authdbConfig.pool.max,
    min: authdbConfig.pool.min,
    acquire: authdbConfig.pool.acquire,
    idle: authdbConfig.pool.idle
  }
});

const authdb = {};

authdb.Sequelize = Sequelize;
authdb.sequelize = sequelize;

authdb.users = require("./user.model.js")(sequelize, Sequelize);

module.exports = authdb;

