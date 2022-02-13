const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");

// @desc Get products
// @route GET /api/goals
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  res.json(products);
});

// @desc Set products
// @route POST /api/goals
// @access Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  const product = await Product.create({
    text: req.body.text,
  });
  res.json(product);
});

// @desc Update product
// @route PUT /api/goals/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.json(updatedProduct);
});

// @desc Delete products
// @route DELETE /api/goals/:id
// @access Private
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  await product.remove();

  res.json({ id: req.params.id });
});

module.exports = {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
};
