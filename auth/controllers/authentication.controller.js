const authdb = require("../models/auth-database");
const User = authdb.users;
const Op = authdb.Sequelize.Op;

const jwt = require('jsonwebtoken');

const accessTokenSecret = 'youraccesstokensecret';

exports.login = async (req, res) => {
    // Validate request
    if (!req.body.username && !req.body.password) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

    // Read username and password from request body
    const { username, password } = req.body;

    // Filter user from the users array by username and password
    const users = await User.findAll();

    const user = users.find(u => {
        return u.username === username && u.password === password
    });

    if (user) {
        // Generate an access token
        const accessToken = jwt.sign({ username: users.username,  role: users.role }, accessTokenSecret);

        res.json({
            accessToken
        });
    } else {
        res.send('Username or password incorrect');
    }
};