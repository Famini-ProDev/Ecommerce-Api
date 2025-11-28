const { z } = require("zod");

exports.registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

exports.loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

exports.updateSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email().optional(),
});
