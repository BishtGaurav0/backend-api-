const Product = require("../models/Product");
const Interaction = require("../models/Interaction");

// Basic Rule-Based Recommendation
exports.getRecommendations = async (req, res) => {
  try {
    const userId = req.user._id;

    // 1. Get user interactions
    const interactions = await Interaction.find({ userId });

    const viewedCategories = new Set();
    const viewedBrands = new Set();
    const purchasedProductIds = new Set();

    interactions.forEach((i) => {
      if (i.type === "view") {
        viewedCategories.add(i.category);
        viewedBrands.add(i.brand);
      }
      if (i.type === "purchase") {
        purchasedProductIds.add(i.productId.toString());
      }
    });

    // 2. Recommend products based on:
    //    - same category or brand
    //    - not already purchased
    const recommended = await Product.find({
      $and: [
        {
          $or: [
            { category: { $in: [...viewedCategories] } },
            { brand: { $in: [...viewedBrands] } },
          ],
        },
        { _id: { $nin: [...purchasedProductIds] } }, // Exclude purchased
      ],
    }).limit(10);

    res.json({ recommendations: recommended });
  } catch (err) {
    console.error("Recommendation error:", err);
    res.status(500).json({ msg: "Server error in recommendations" });
  }
};
