module.exports = app => {
    const authentications = require("../controllers/authentication.controller.js");
  
    var router = require("express").Router();
  
    // Login
    router.post("/login/", authentications.login);

    // Refresh Token
    router.post("/refresh/", authentications.refresh);

    // Logout
    router.post("/logout/", authentications.logout);
  
    app.use('/auth', router);
  };