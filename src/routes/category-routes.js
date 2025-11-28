const router = require("express").Router();
const categoryController = require("../controllers/category-controller");
const validate = require("../middlewares/validate");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../schemas/category-schema");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// Admin only
router.post(
  "/",
  auth,
  admin,
  validate(createCategorySchema),
  categoryController.createCategory
);

router.put(
  "/:id",
  auth,
  admin,
  validate(updateCategorySchema),
  categoryController.updateCategory
);

router.delete("/:id", auth, admin, categoryController.deleteCategory);

// Public
router.get("/", categoryController.getCategories);

module.exports = router;
