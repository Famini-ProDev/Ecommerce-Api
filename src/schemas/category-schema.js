const { z } = require("zod");

exports.createCategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters"),
  description: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .optional(),
});

exports.updateCategorySchema = z.object({
  name: z.string().min(2).optional(),
  description: z.string().min(5).optional(),
});
