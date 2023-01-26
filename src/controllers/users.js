const UsersModel = require("../models/users");
const sequelize = require("sequelize");
const { hashPassword, createToken } = require("../config/encript");

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
  register: async (req, res) => {
    let { username, fullname, password, phone, email } = req.body;
    let newPass = hashPassword(password);
    console.log(newPass);

    try {
      let data = await UsersModel.findAll({
        where: {
          [sequelize.Op.or]: [{ username }, { fullname }, { password }, { phone }, { email }],
        },
      });
      console.log("cek2:", data);

      if (data.length > 0) {
        return res.status(200).send({
          success: false,
          message: "Data is already exists.",
        });
      } else {
        try {
          let create = await UsersModel.create({
            username,
            fullname,
            password: newPass,
            phone,
            email,
          });
          return res.status(200).send({
            success: true,
            message: "Register account success",
            data: create,
          });
        } catch (err) {
          console.log(err);
          return res.status(500).send(err);
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  },
};
