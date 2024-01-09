const express = require("express");
const roleRouter = express.Router();

// roleRouter on http://localhost:5000/role

const { createRole, updateRolePermissions } = require("../controllers/roles");

roleRouter.post("/", createRole);
roleRouter.put("/update", updateRolePermissions);

module.exports = roleRouter;
