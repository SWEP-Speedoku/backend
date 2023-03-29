module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const authenticator = require("../../services/authentication.middleware.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", authenticator.checkAdminCreation, users.create);
  
    // Retrieve all Users (Admin Only)
    router.get("/", authenticator.authenticateJWT, users.findAll);
  
    // Retrieve a single User with id
    router.get("/id=:id", authenticator.authenticateJWT, users.findOne);
  
    // Update a User with id
    router.put("/id=:id", authenticator.authenticateJWT, users.update);
  
    // Delete a User with id
    router.delete("/id=:id", authenticator.authenticateJWT, users.delete);
  
    // Delete all Users (Admin Only)
    router.delete("/", authenticator.authenticateJWT, users.deleteAll);

    // Returns current User
    router.get("/me", authenticator.authenticateJWT, users.me);
  
    app.use('/api/users', router);
  };