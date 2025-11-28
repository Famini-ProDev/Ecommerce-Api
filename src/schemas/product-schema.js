const { z } = require("zod");

exports.createProductSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  price: z.number().nonnegative(),
  category: z.string().min(1),
  stock: z.number().int().nonnegative().optional().default(0),
  images: z.array(z.string().url()).optional(),
  isPublished: z.boolean().optional(),
});

exports.updateProductSchema = exports.createProductSchema.partial();
