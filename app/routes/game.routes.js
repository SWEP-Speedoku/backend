module.exports = app => {
    const game = require("../controllers/leaderboard.controller.js");
    const authenticator = require("../../services/authentication.middleware.js");
  
    var router = require("express").Router();

    // Retrieve a new random level
    router.get("/random", authenticator.authenticateJWT, game.createRandom);

    // Validate a played level to check if the solution is correct
    router.post("/validate", authenticator.authenticateJWT, game.validateLevel);
  
    app.use('/api/game', router);
  };