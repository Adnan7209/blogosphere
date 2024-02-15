const mongoose = require("mongoose");

const mongoDbConnect = async (url) => {
  return mongoose.connect(url);
};

module.exports = { mongoDbConnect };
