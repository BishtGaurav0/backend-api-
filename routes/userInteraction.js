const express = require("express");
const router = express.Router();
const UserInteraction = require("../models/UserInteraction");
const { protect } = require("../middlewares/auth");  // Your JWT auth middleware

// POST /api/interactions - Log an interaction
router.post("/", protect, async (req, res) => {
  try {
    const { productId, interactionType } = req.body;

    if (!productId || !interactionType) {
      return res.status(400).json({ msg: "Missing productId or interactionType" });
    }

    const interaction = new UserInteraction({
      userId: req.user._id,
      productId,
      interactionType
    });

    await interaction.save();
    res.json({ msg: "Interaction logged", interaction });
  } catch (err) {
    console.error("Error logging interaction", err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
