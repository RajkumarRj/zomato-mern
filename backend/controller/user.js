const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

dotenv.config();

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const validate = await userModel.findOne({ email: req.body.email });

  if (!validate) {
    const user = await userModel.create(req.body);
  } else {
    return res.status(403).json({
      success: false,
      message: "Email is already exists",
    });
  }

  res.json({
    success: true,
    message: "Registered Successfully",
  });
};

const login = async (req, res) => {
  const user = await userModel.findOne({ email: req.body.email });
  console.log(req.body);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Email not Found",
    });
  }
  const isPassValid = await bcrypt.compareSync(
    req.body.password,
    user.password
  );

  if (!isPassValid) {
    return res.status(401).json({
      success: false,
      message: "Password does not match",
    });
  }

  console.log(user._id);
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.JWT_KEY, {
    expiresIn: "5d",
  });

  res.json({
    success: true,
    message: "logged in Successfully",
    token: token,
  });
};

module.exports = {
  register,
  login,
};
