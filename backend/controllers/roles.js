const rolesModel = require("../models/role");

const createRole = (req, res) => {
  const { role, permissions } = req.body;
  const newRole = new rolesModel({
    role,
    permissions,
  });
  newRole
    .save()
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role created",
        role: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = { createRole };
