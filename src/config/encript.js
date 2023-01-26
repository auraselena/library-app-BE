const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  hashPassword: (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    return hashPass;
  },
//   createToken: (payload, expired = "24h") => {
//     let token = jwt.sign(payload, "library", {
//       expiresIn: expired,
//     });
//     return token;
//   },
};
