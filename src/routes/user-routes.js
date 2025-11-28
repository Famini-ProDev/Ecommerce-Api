const express = require("express");
const router = express.Router();
const userController = require("../controllers/user-controller");
const validate = require("../middlewares/validate");
const {
  registerSchema,
  loginSchema,
  updateSchema,
} = require("../schemas/user-schema");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// Public routes
router.post("/register", validate(registerSchema), userController.registerUser);
router.post("/login", validate(loginSchema), userController.loginUser);
router.post("/token", userController.refreshToken);
router.post("/logout", userController.logout);

// Protected routes
router.get("/me", auth, userController.getProfile);
router.put("/me", auth, validate(updateSchema), userController.updateProfile);

// Admin routes
router.get("/", auth, admin, userController.getUsers);

module.exports = router;
