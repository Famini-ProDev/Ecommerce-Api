const router = require("express").Router();
const orderController = require("../controllers/order-controller");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const validate = require("../middlewares/validate");
const {
  createOrderSchema,
  updateOrderStatusSchema,
} = require("../schemas/order-schema");

router.post(
  "/",
  auth,
  validate(createOrderSchema),
  orderController.createOrder
);
router.get("/my", auth, orderController.getMyOrders);
router.get("/", auth, admin, orderController.getOrders);
router.put(
  "/:id/status",
  auth,
  admin,
  validate(updateOrderStatusSchema),
  orderController.updateOrderStatus
);

module.exports = router;
