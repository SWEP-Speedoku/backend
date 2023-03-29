module.exports = app => {
    const gamelevels = require("../controllers/gamelevel.controller.js");
    const authenticator = require("../../services/authentication.middleware.js");
  
    var router = require("express").Router();
  
    // Create a new Level (Admin Only)
    router.post("/", authenticator.authenticateJWT, gamelevels.create);
  
    // Retrieve all Levels
    router.get("/", authenticator.authenticateJWT, gamelevels.findAll);

    // Retrieve a single Level with id
    router.get("/id=:id", authenticator.authenticateJWT, gamelevels.findOne);
  
    // Update a Level with id (Admin Only)
    router.put("/id=:id", authenticator.authenticateJWT, gamelevels.update);

    // Delete a Level with id (Admin Only)
    router.delete("/id=:id", authenticator.authenticateJWT, gamelevels.delete);

    // Delete all Entries (Admin Only)
    router.delete("/", authenticator.authenticateJWT, gamelevels.deleteAll);
  
    app.use('/api/gamelevels', router);
  };