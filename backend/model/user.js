const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", function () {
  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
});

module.exports = mongoose.model("user", userSchema);
