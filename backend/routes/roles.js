const express = require("express");
const roleRouter = express.Router();

// roleRouter on http://localhost:5000/role

const { createRole } = require("../controllers/roles");

roleRouter.post("/", createRole);

module.exports = roleRouter;
