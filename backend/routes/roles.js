const express = require("express");
const roleRouter = express.Router();

// roleRouter on https://sky-hcfs.onrender.com/role

const { createRole, updateRolePermissions } = require("../controllers/roles");

roleRouter.post("/", createRole);
roleRouter.put("/update", updateRolePermissions);

module.exports = roleRouter;
