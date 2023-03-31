const express = require("express");
const cors = require("cors");
const routingConfig = require("../../config/routing.config");

const app = express();

var corsOptions = {
  origin: routingConfig.CORS_ORIGIN
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// require the database from the model
const db = require("./app/models/database");

// development sync
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// deployment sync
/*
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
*/

// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Speedoku Webserver." });
});

// require the routes of the API
require("./app/routes/game.routes")(app);
require("./app/routes/gamelevel.routes")(app);
require("./app/routes/gamesave.routes")(app);
require("./app/routes/leaderboard.routes")(app);
require("./app/routes/leaderboardEntry.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || routingConfig.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// listen for warnings
process.on('warning', (warning) => {
    console.log(warning.stack);
});
