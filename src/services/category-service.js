const Category = require("../models/category-model");

exports.createCategory = async ({ name, description }) => {
  const exists = await Category.findOne({ name });
  if (exists) throw new Error("CATEGORY_EXISTS");

  return Category.create({ name, description });
};

exports.getCategories = async () => {
  return Category.find();
};

exports.updateCategory = async (id, updates) => {
  const category = await Category.findByIdAndUpdate(id, updates, {
    new: true,
  });
  if (!category) throw new Error("CATEGORY_NOT_FOUND");

  return category;
};

exports.deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) throw new Error("CATEGORY_NOT_FOUND");

  return category;
};
