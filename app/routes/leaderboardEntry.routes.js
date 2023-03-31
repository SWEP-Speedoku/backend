module.exports = app => {
    const leaderboardEntries = require("../controllers/leaderboardEntry.controller.js");
    const authenticator = require("../../services/authentication.middleware.js");
    const routingConfig = require("../../config/routing.config");
  
    var router = require("express").Router();
  
    // Create a new Entry
    router.post("/", authenticator.authenticateJWT, leaderboardEntries.create);
  
    // Retrieve all Entries (Admin Only)
    router.get("/all", authenticator.authenticateJWT, leaderboardEntries.findAll);

    // Retrieve all Entries from a User
    router.get("/", authenticator.authenticateJWT, leaderboardEntries.findAllFromUser);

    // Retrieve a single Entry with id
    router.get("/id=:id", authenticator.authenticateJWT, leaderboardEntries.findOne);
  
    // Delete an Entry with id
    router.delete("/id=:id", authenticator.authenticateJWT, leaderboardEntries.delete);
  
    // Delete all Entries from a User
    router.delete("/", authenticator.authenticateJWT, leaderboardEntries.deleteAllFromUser);

    // Delete all Entries (Admin Only)
    router.delete("/all", authenticator.authenticateJWT, leaderboardEntries.deleteAll);
  
    app.use(`${routingConfig.APP_ENDPOINT}/leaderboardentries`, router);
  };