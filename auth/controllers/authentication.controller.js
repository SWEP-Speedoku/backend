const authdb = require("../models/auth-database");
const User = authdb.users;
const Op = authdb.Sequelize.Op;

const jwt = require('jsonwebtoken');
const authenticationConfig = require("../../config/authentication.config");

var refreshTokens = [];

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
        const accessToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, authenticationConfig.ACCESS_TOKEN_SECRET, { expiresIn: authenticationConfig.SESSION_LENGTH });
        const refreshToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, authenticationConfig.REFRESH_TOKEN_SECRET, { expiresIn: authenticationConfig.REFRESH_LENGTH });

        refreshTokens.push(refreshToken);

        res.json({
            accessToken,
            refreshToken
        });
    } else {
        res.send('Username or password incorrect');
    }
};

exports.refresh = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    }

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    }

    jwt.verify(token, authenticationConfig.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({ id: user.id, username: user.username, role: user.role }, authenticationConfig.ACCESS_TOKEN_SECRET, { expiresIn: authenticationConfig.SESSION_LENGTH });

        res.json({
            accessToken
        });
    });
};

exports.logout = (req, res) => {
    const { token } = req.body;
    refreshTokens = refreshTokens.filter(t => t !== token);
    
    res.send("Logout successful");
};