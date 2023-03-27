module.exports = app => {
    const authusers = require("../controllers/auth-user.controller.js");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", authusers.create);
  
    // Retrieve all Users
    router.get("/", authusers.findAll);
  
    // Retrieve a single User with id
    router.get("/:id", authusers.findOne);
  
    // Update a User with id
    router.put("/:id", authusers.update);
  
    // Delete a User with id
    router.delete("/:id", authusers.delete);
  
    // Delete all Users
    router.delete("/", authusers.deleteAll);
  
    app.use('/api/authusers', router);
  };