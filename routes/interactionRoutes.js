const express = require('express');
const router = express.Router();
const { trackInteraction } = require('../controllers/userInteractionController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, trackInteraction);

module.exports = router;
