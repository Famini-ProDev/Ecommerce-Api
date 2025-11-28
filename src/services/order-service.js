const mongoose = require("mongoose");
const Order = require("../models/order-model");
const Product = require("../models/product-model");

exports.createOrder = async (userId, items, address) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("NO_ITEMS");
    }

    const productIds = items.map((i) => i.productId);

    const products = await Product.find({
      _id: { $in: productIds },
    }).session(session);

    let total = 0;
    const orderProducts = [];

    for (const item of items) {
      const prod = products.find((p) => p._id.equals(item.productId));

      if (!prod) throw new Error("PRODUCT_NOT_FOUND_" + item.productId);

      if (prod.stock < item.quantity)
        throw new Error("INSUFFICIENT_STOCK_" + prod.name);

      prod.stock -= item.quantity;
      await prod.save({ session });

      orderProducts.push({
        product: prod._id,
        name: prod.name,
        price: prod.price,
        quantity: item.quantity,
      });

      total += prod.price * item.quantity;
    }

    const order = new Order({
      user: userId,
      products: orderProducts,
      totalPrice: total,
      address,
      status: "pending",
    });

    await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
  }
};

exports.getMyOrders = async (userId) => {
  return Order.find({ user: userId }).sort({ createdAt: -1 });
};

exports.getOrders = async ({ page = 1, pageSize = 10, status, user }) => {
  const size = Math.min(pageSize, 100);
  const skip = (page - 1) * size;

  const filter = {};
  if (status) filter.status = status;
  if (user) filter.user = user;

  const total = await Order.countDocuments(filter);

  const orders = await Order.find(filter)
    .skip(skip)
    .limit(size)
    .populate("user", "name email");

  return { page, pageSize: size, total, orders };
};

exports.updateOrderStatus = async (id, status) => {
  const order = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) throw new Error("ORDER_NOT_FOUND");

  return order;
};
