module.exports = app => {
    const leaderboard = require("../controllers/leaderboard.controller.js");
    const authenticator = require("../../services/authentication.middleware.js");
  
    var router = require("express").Router();

    // Retrieve all Entries for a Level
    router.get("/id=:id", authenticator.authenticateJWT, leaderboard.findAllForId);
  
    app.use('/api/leaderboard', router);
  };