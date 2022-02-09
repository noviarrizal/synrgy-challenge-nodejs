const express = require("express");
const { route } = require("express/lib/application");
const router = express.Router();
const {
  getTest,
  setTest,
  updateTest,
  deleteTest,
} = require("../controllers/testController");

router.route("/").get(getTest).post(setTest);
router.route("/:id").delete(deleteTest).put(updateTest);

// router.get("/", getTest);

// router.post("/", setTest);

// router.put("/:id", updateTest);

// router.delete("/:id", deleteTest);

module.exports = router;
