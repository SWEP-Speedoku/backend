const jwt = require('jsonwebtoken');
const authenticationConfig = require("../config/authentication.config");

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, authenticationConfig.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

exports.checkAdminCreation = (req, res, next) => {
    const {role, adminpassword} = req.body;

    if (role !== 'admin') {
        next();
    } else {
        if (adminpassword == authenticationConfig.ADMIN_PASSWORD) {
            next();
        } else {
            res.sendStatus(401);
        }
    }
};