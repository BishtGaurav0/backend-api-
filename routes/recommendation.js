const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const getHybridRecommendations = require("../utils/getHybridRecommendations");
const UserInteraction = require("../models/UserInteraction");

// GET /api/recommendations/:id/hybrid
router.get("/:id/hybrid", async (req, res) => {
  try {
    const targetProduct = await Product.findById(req.params.id);
    if (!targetProduct) return res.status(404).json({ msg: "Product not found" });

    const allProducts = await Product.find();
    const hybrid = getHybridRecommendations(allProducts, targetProduct);

    res.json({ recommendations: hybrid });
  } catch (err) {
    console.error("Hybrid recommendation error:", err);
    res.status(500).json({ msg: "Server error" });
  }
});


// GET /api/recommendations/user/:userId/personalized
router.get("/user/:userId/personalized", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find products user has interacted with most (views, clicks, purchases)
    const interactions = await UserInteraction.aggregate([
      { $match: { userId: mongoose.Types.ObjectId(userId) } },
      { $group: {
          _id: "$productId",
          count: { $sum: 1 }
      }},
      { $sort: { count: -1 }},
      { $limit: 5 }
    ]);

    const productIds = interactions.map(i => i._id);

    // Fetch these products
    const products = await Product.find({ _id: { $in: productIds } });

    res.json({ personalizedRecommendations: products });
  } catch (err) {
    console.error("Personalized recommendation error", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
