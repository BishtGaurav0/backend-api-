const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/auth");
const { getRecommendations } = require("../controllers/recommendationController");

router.get("/", protect, getRecommendations);

module.exports = router;
