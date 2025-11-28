const router = require("express").Router();
const productController = require("../controllers/product-controller");
const validate = require("../middlewares/validate");
const {
  createProductSchema,
  updateProductSchema,
} = require("../schemas/product-schema");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

// public
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);

// admin
router.post(
  "/",
  auth,
  admin,
  validate(createProductSchema),
  productController.createProduct
);
router.put(
  "/:id",
  auth,
  admin,
  validate(updateProductSchema),
  productController.updateProduct
);
router.delete("/:id", auth, admin, productController.deleteProduct);

module.exports = router;
