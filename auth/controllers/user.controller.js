const authdb = require("../models/auth-database");
const User = authdb.users;
const Op = authdb.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
  if (!req.body.username && !req.body.password) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a User
  const user = {
    username: req.body.username,
    password: req.body.password,
    role: req.body.role
  };

    // Save User in the database
  User.create(user)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the user."
          });
      });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {

  // Check that request comes from an admin
  const { role } = req.user;

  if (role !== 'admin') {
      return res.sendStatus(403);
  }

  const username = req.query.username;
  var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
  };

// Find a single User with an id
exports.findOne = (req, res) => {

    const req_id = req.params.id;

    // Check that request comes from an admin or the same id
    const { id, role } = req.user;

    if ((role !== 'admin') && (id != req_id)) {
        return res.sendStatus(403);
    }

    console.log("TEEEST")

    User.findByPk(req_id)
      .then(data => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find User with id=${req_id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving User with id=" + req_id
        });
      });
  };

// Update a User by the id in the request
exports.update = (req, res) => {

  const req_id = req.params.id;

  // Check that request comes from an admin or the same id
  const { id, role } = req.user;

  if ((role !== 'admin') && (id != req_id)) {
      return res.sendStatus(403);
  }

  Tutorial.update(req.body, {
    where: { id: req_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {

  const req_id = req.params.id;

  // Check that request comes from an admin or the same id
  const { id, role } = req.user;

  if ((role !== 'admin') && (id != req_id)) {
      return res.sendStatus(403);
  }

  Tutorial.destroy({
    where: { id: req_id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {

  // Check that request comes from an admin
  const { role } = req.user;

  if (role !== 'admin') {
      return res.sendStatus(403);
  }

  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    });
};

// Returns the current user
exports.me = (req, res) => {

  const { id } = req.user;

  User.findByPk(id)
  .then(data => {
    if (data) {
      res.send(data);
    } else {
      res.status(404).send({
        message: `Cannot find User with id=${id}.`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
};

