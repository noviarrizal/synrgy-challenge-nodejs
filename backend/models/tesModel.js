const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    text: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);
