const express = require("express");
const productController = require("../controller/product");

const router = express.Router();

router.get("/product", productController.getproduct);

module.exports = router;
