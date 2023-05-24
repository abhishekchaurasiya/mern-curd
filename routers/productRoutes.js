const express = require("express");
const { createProduct, updateProduct, showAllProducts, deleteProduct } = require("../controller/ProductCtr");
const { isAuthenticate } = require("../middleware/auth");

const router = express.Router();

router.post("/addproduct", isAuthenticate, createProduct);
router.put("/updateproduct/:id", isAuthenticate, updateProduct)
router.get("/allproduct", isAuthenticate, showAllProducts)
router.delete("/deleteimage/:id", isAuthenticate, deleteProduct)

module.exports = router;