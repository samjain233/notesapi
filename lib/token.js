const jwt = require("jsonwebtoken");
const jwtsecret = process.env.JWT_SECRET;
const createToken = async (userId) => {
  const token = await jwt.sign({ _id: userId }, jwtsecret, { expiresIn: "1h" });
  return token;
};

const getTokenData = async (token) => {
  const userId = await jwt.verify(token, jwtsecret);
  return userId;
};

module.exports = { createToken, getTokenData };
