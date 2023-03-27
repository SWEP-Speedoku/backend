module.exports = app => {
    const authentications = require("../controllers/authentication.controller.js");
  
    var router = require("express").Router();
  
    // Login
    router.post("/", authentications.login);
  
    app.use('/api/login', router);
  };