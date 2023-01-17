const bcrypt = require('bcrypt');

//Hash password

const hashPassword = (password: any) => {
  return bcrypt.hash(password, 10);
};

// Compare password

const comparePassword = (password: any, hash: any) => {
  return bcrypt.compare(password, hash);
};

module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;
