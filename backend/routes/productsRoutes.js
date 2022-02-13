const express = require("express");
const router = express.Router();
const {
  getProducts,
  setProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsController");

// Chaining the same route
router.route("/").get(getProducts).post(setProduct);
router.route("/:id").delete(deleteProduct).put(updateProduct);

module.exports = router;
