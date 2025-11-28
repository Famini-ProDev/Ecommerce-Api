const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

exports.registerUser = async ({ name, email, password }) => {
  const exists = await User.findOne({ email });
  if (exists) throw new Error("USER_EXISTS");

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    name,
    email,
    password: hashedPassword,
  });

  const refreshToken = generateRefreshToken(user);
  const accessToken = generateAccessToken(user);

  user.refreshTokens = [refreshToken];
  await user.save();

  return { user, accessToken, refreshToken };
};

exports.loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("NOT_FOUND");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) throw new Error("INVALID_PASSWORD");

  const refreshToken = generateRefreshToken(user);
  const accessToken = generateAccessToken(user);

  user.refreshTokens = [refreshToken];
  await user.save();

  return { user, accessToken, refreshToken };
};

exports.refreshToken = async (token) => {
  const user = await User.findOne({ refreshTokens: token });
  if (!user) throw new Error("INVALID_REFRESH");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    throw new Error("EXPIRED_REFRESH");
  }

  const accessToken = generateAccessToken(user);
  return { accessToken };
};

exports.logout = async (token) => {
  await User.updateOne(
    { refreshTokens: token },
    { $pull: { refreshTokens: token } }
  );
  return true;
};

exports.getProfile = async (userId) => {
  return User.findById(userId).select("-password -refreshTokens");
};

exports.updateProfile = async (userId, data) => {
  const { email } = data;

  if (email) {
    const exists = await User.findOne({ email, _id: { $ne: userId } });
    if (exists) throw new Error("EMAIL_EXISTS");
  }

  return User.findByIdAndUpdate(userId, data, {
    new: true,
    runValidators: true,
  }).select("-password -refreshTokens");
};

exports.getUsers = async ({ page = 1, pageSize = 10 }) => {
  const skip = (page - 1) * pageSize;

  const users = await User.find()
    .skip(skip)
    .limit(pageSize)
    .select("-password -refreshTokens");

  const total = await User.countDocuments();

  return { page, pageSize, total, users };
};
