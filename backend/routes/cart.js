const express = require("express");
const cartController = require("../controller/cart");

const router = express.Router();

router.post("/add", cartController.addCart);

router.put("/update/:id", cartController.updateCart);

router.delete("/remove/:id", cartController.deleteCart);

module.exports = router;
