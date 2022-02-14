const asyncHandler = require("express-async-handler");

const Product = require("../models/productModel");
const User = require("../models/productModel");

// @desc Get products
// @route GET /api/products
// @access Private
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id });

  res.json(products);
});

// @desc Set products
// @route POST /api/product
// @access Private
const setProduct = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add text field");
  }

  const product = await Product.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.json(product);
});

// @desc Update product
// @route PUT /api/product/:id
// @access Private
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(400);
    throw new Error("Product not found");
  }

  const user = await User.findById(req.user.id);

  // CHeck for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure The logged in user matches the product user
  if (product.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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

  const user = await User.findById(req.user.id);

  // CHeck for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure The logged in user matches the product user
  if (product.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
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
