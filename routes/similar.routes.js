const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const getSimilarProducts = require("../utils/getSimilarProducts");

router.get("/:id/similar", async (req, res) => {
  try {
    const targetProduct = await Product.findById(req.params.id);
    if (!targetProduct) return res.status(404).json({ msg: "Product not found" });

    const allProducts = await Product.find();
    const similar = getSimilarProducts(allProducts, targetProduct, 5);

    res.json({ similar });
  } catch (err) {
    console.error("Error finding similar products", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
