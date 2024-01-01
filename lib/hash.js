const bcrypt = require("bcrypt");
const saltRounds = 10;

const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);
  return hashedPassword;
};

const verifyPassword = async (password, hash)=>{
    const passwordMatch = await bcrypt.compare(password, hash);
    return passwordMatch
}

module.exports = {hashPassword,verifyPassword};
