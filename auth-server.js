const express = require('express');
const app = express();


// parse requests of content-type - application/json
app.use(express.json());


// require the database from the model
const authdb = require("./auth/models/auth-database");

// development sync
authdb.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// deployment sync
/*
authdb.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
*/


// require the routes of the API
require("./auth/routes/auth-user.routes")(app);
require("./auth/routes/authentication.routes")(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('Authentication service started on port 4000');
});