module.exports = app => {
    const leaderboard = require("../controllers/leaderboard.controller.js");
    const authenticator = require("../../services/authentication.middleware.js");
    const routingConfig = require("../../config/routing.config");
  
    var router = require("express").Router();

    // Retrieve all Entries for a Level
    router.get("/id=:id", authenticator.authenticateJWT, leaderboard.findAllForId);
  
    app.use(`${routingConfig.APP_ENDPOINT}/leaderboard`, router);
  };