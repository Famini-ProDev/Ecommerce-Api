const userService = require("../services/user-service");

exports.registerUser = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await userService.registerUser(
      req.body
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    if (err.message === "USER_EXISTS")
      return res.status(400).json({ message: "User already exists" });
    next(err);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { user, accessToken, refreshToken } = await userService.loginUser(
      req.body
    );

    res.json({ accessToken, refreshToken });
  } catch (err) {
    if (err.message === "NOT_FOUND")
      return res.status(404).json({ message: "User not found" });

    if (err.message === "INVALID_PASSWORD")
      return res.status(400).json({ message: "Invalid password" });

    next(err);
  }
};

exports.refreshToken = async (req, res, next) => {
  try {
    const { accessToken } = await userService.refreshToken(req.body.token);
    res.json({ accessToken });
  } catch (err) {
    if (err.message === "INVALID_REFRESH")
      return res.status(403).json({ message: "Invalid token" });

    if (err.message === "EXPIRED_REFRESH")
      return res.status(403).json({ message: "Token expired" });

    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    await userService.logout(req.body.token);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getProfile(req.user.id);
    res.json({ user });
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const user = await userService.updateProfile(req.user.id, req.body);
    res.json({ message: "Profile updated", user });
  } catch (err) {
    if (err.message === "EMAIL_EXISTS")
      return res.status(400).json({ message: "Email already exists" });

    next(err);
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const { page, pageSize, total, users } = await userService.getUsers({
      page: Number(req.query.page),
      pageSize: Number(req.query.pageSize),
    });

    res.json({ page, pageSize, total, users });
  } catch (err) {
    next(err);
  }
};
