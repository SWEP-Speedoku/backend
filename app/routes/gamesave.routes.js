module.exports = app => {
    const gamesaves = require("../controllers/gamesave.controller.js");
    const authenticator = require("../../services/authentication.middleware.js");
  
    var router = require("express").Router();
  
    // Create a new Save
    router.post("/", authenticator.authenticateJWT, gamesaves.create);
  
    // Retrieve all Saves (Admin Only)
    router.get("/all", authenticator.authenticateJWT, gamesaves.findAll);

    // Retrieve all Saves from a User
    router.get("/", authenticator.authenticateJWT, gamesaves.findAllFromUser);

    // Retrieve a single Save with id
    router.get("/id=:id", authenticator.authenticateJWT, gamesaves.findOne);
  
    // Delete a Save with id
    router.delete("/id=:id", authenticator.authenticateJWT, gamesaves.delete);
  
    // Delete all Saves from a User
    router.delete("/", authenticator.authenticateJWT, gamesaves.deleteAllFromUser);

    // Delete all Saves (Admin Only)
    router.delete("/all", authenticator.authenticateJWT, gamesaves.deleteAll);
  
    app.use('/api/gamesaves', router);
  };