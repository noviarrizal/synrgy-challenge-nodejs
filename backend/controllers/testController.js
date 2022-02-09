const asyncHandler = require("express-async-handler");

const Test = require("../models/tesModel");

const getTest = asyncHandler(async (req, res) => {
  const Tes = await Test.find();

  res.json(Tes);
});

const setTest = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.json({ message: "Create Test" });
});

const updateTest = asyncHandler(async (req, res) => {
  res.json({ message: `Update Test ${req.params.id}` });
});

const deleteTest = asyncHandler(async (req, res) => {
  res.json({ message: `Delete Test ${req.params.id}` });
});

module.exports = {
  getTest,
  setTest,
  updateTest,
  deleteTest,
};
