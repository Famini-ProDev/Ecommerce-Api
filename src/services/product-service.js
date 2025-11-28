const Product = require("../models/product-model");
const Category = require("../models/category-model");
const slugify = require("slugify");

exports.createProduct = async (data) => {
  const { name, description, price, category, stock, images, isPublished } =
    data;

  const slug = slugify(name, { lower: true });

  const exists = await Product.findOne({ slug });
  if (exists) throw new Error("Product with same name exists");

  const categoryExists = await Category.findById(category);
  if (!categoryExists) throw new Error("Category not found");

  const product = await Product.create({
    name,
    slug,
    description,
    price,
    category,
    stock,
    images,
    isPublished: isPublished ?? true,
  });

  return product;
};

exports.getProducts = async (query) => {
  const page = parseInt(query.page) || 1;
  const pageSize = Math.min(parseInt(query.pageSize) || 10, 100);

  const filter = { isPublished: true };

  if (query.category) filter.category = query.category;

  if (query.search) filter.$text = { $search: query.search };

  const sort =
    query.sort === "price_asc"
      ? { price: 1 }
      : query.sort === "price_desc"
      ? { price: -1 }
      : { createdAt: -1 };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate("category", "name description")
    .sort(sort)
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  return {
    page,
    pageSize,
    total,
    products,
  };
};

exports.getProductById = async (id) => {
  const product = await Product.findById(id).populate(
    "category",
    "name description"
  );

  if (!product) throw new Error("Product not found");

  return product;
};

exports.updateProduct = async (id, updates) => {
  if (updates.name) {
    updates.slug = slugify(updates.name, { lower: true });
  }

  const product = await Product.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });

  if (!product) throw new Error("Product not found");

  return product;
};

exports.deleteProduct = async (id) => {
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new Error("Product not found");
  return true;
};
