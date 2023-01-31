const UsersModel = require("../models/users");
const sequelize = require("sequelize");
const { hashPassword, createToken } = require("../config/encript");
const bcrypt = require("bcrypt");
// hashpassword itu = token
// hashpaswword --> gabisa diubah balik password semula
// token --> bisa diubah balik password semula

module.exports = {
  getData: async (req, res) => {
    try {
      let data = await UsersModel.findAll();
      return res.status(200).send(data);
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  login: async (req, res) => {
    let { username, password } = req.body;
    try {
      let data = await UsersModel.findAll({
        where: {
          username,
          // password,
        },
      });
      console.log("cek login", data);
      // return res.status(200).send(data)

      // if (data.dataValues.id) {
      if (data.length > 0) {
        let checkPass = bcrypt.compareSync(password, data[0].dataValues.password);
        if (checkPass) {
          let token = createToken({ ...data[0].dataValues });
          return res.status(200).send({ ...data[0].dataValues, token });
        } else {
          return res.status(200).send({
            success: false,
            message: "Password incorrect",
          });
        }
        return res.status(200).send({ ...data.dataValues });
      } else {
        return res.status(200).send({
          success: false,
          message: "This account doesn't exists",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
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
        } catch (error) {
          console.log(error);
          return res.status(500).send(error);
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
  keeplogin: async (req, res) => {
    console.log("cek req.decript", req.decript);
    try {
      let data = await UsersModel.findAll({
        where: {
          id: req.decript.id,
        },
      });
      console.log(data);

      let token = createToken({ ...data[0].dataValues });
      return res.status(200).send({ ...data[0].dataValues, token });
    } catch (error) {
      console.log(error);
      return res.status(500).send(error);
    }
  },
};
