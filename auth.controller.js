const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateToken");
const { registerSchema } = require("../validations/auth.validation");

exports.register = async (req, res) => {
  const data = registerSchema.parse(req.body);
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await User.create({ ...data, password: hashedPassword });
  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user)
  });
};
