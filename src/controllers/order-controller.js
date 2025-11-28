const orderService = require("../services/order-service");

exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.createOrder(
      req.user.id,
      req.body.items,
      req.body.address
    );

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    if (err.message === "NO_ITEMS")
      return res.status(400).json({ message: "No items provided" });

    if (err.message.startsWith("PRODUCT_NOT_FOUND_")) {
      const id = err.message.split("_").pop();
      return res.status(404).json({ message: `Product ${id} not found` });
    }

    if (err.message.startsWith("INSUFFICIENT_STOCK_")) {
      const name = err.message.replace("INSUFFICIENT_STOCK_", "");
      return res
        .status(400)
        .json({ message: `Insufficient stock for ${name}` });
    }

    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getMyOrders(req.user.id);
    res.json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const { page, pageSize, status, user } = req.query;

    const result = await orderService.getOrders({
      page: Number(page),
      pageSize: Number(pageSize),
      status,
      user,
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const order = await orderService.updateOrderStatus(
      req.params.id,
      req.body.status
    );

    res.json({ message: "Order status updated", order });
  } catch (err) {
    if (err.message === "ORDER_NOT_FOUND") {
      return res.status(404).json({ message: "Order not found" });
    }
    next(err);
  }
};
