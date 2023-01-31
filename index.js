const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const bearerToken = require("express-bearer-token");

const PORT = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(bearerToken());

const { checkSequelize, dbSequelize } = require("./src/config/db");
checkSequelize();
dbSequelize.sync();

app.get("/", (req, res) => {
  res.status(200).send("Library App API");
});

const { usersRouter } = require("./src/routers");
app.use("/users", usersRouter);

app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
