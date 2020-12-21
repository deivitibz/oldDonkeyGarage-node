const bcrypt = require("bcryptjs");
const moment = require("moment");
const jwt = require("jsonwebtoken");

const checkPassword = (bodyPass, dbPass) => {
    return bcrypt.compareSync(bodyPass, dbPass);
  }

const messageHandler = (body,headers,message) => {
    return {
        body: body,
        headers: headers,
        message: message
    }
}

function createToken(userId, role) {
    const payload = {
      userId: userId,
      role: role,
      createdAt: moment().unix(),
      expiredAt: moment().add(1440, "minutes").unix(),
    };
    return jwt.sign(payload, process.env.SECRET_KEY);
  }

module.exports = { checkPassword, messageHandler, createToken}
    