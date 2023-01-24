const { Router } = require("express");
const express = require("express");
const route = express.Router();
const { usersController } = require("../controllers");

route.get("/", usersController.getData);

module.exports = route;
