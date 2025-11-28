const categoryService = require("../services/category-service");

exports.createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({
      message: "Category created",
      category,
    });
  } catch (err) {
    if (err.message === "CATEGORY_EXISTS") {
      return res.status(400).json({ message: "Category already exists" });
    }
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getCategories();
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );

    res.json({ message: "Category updated", category });
  } catch (err) {
    if (err.message === "CATEGORY_NOT_FOUND") {
      return res.status(404).json({ message: "Category not found" });
    }
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);

    res.json({ message: "Category deleted" });
  } catch (err) {
    if (err.message === "CATEGORY_NOT_FOUND") {
      return res.status(404).json({ message: "Category not found" });
    }
    next(err);
  }
};
