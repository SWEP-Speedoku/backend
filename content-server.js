const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
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
//require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// listen for warnings
process.on('warning', (warning) => {
    console.log(warning.stack);
});
