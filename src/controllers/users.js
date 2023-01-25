const UsersModel = require("../models/users");
const sequelize = require("sequelize");

module.exports = {
  getData: async (req, res) => {
    try {
      let data = await UsersModel.findAll();
      return res.status(200).send(data);
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
  login: async (req, res) => {
    let { username, password } = req.body;
    try {
      let data = await UsersModel.findOne({
        where: {
          username,
          password,
        },
      });
      console.log(data);
      // return res.status(200).send(data)

      if (data.dataValues.id) {
        return res.status(200).send({ ...data.dataValues });
      } else {
        return res.status(200).send({
          success: false,
          message: "This account doesn't exists",
        });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
