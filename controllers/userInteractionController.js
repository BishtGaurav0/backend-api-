const Interaction = require('../models/Interaction');

exports.trackInteraction = async (req, res) => {
  try {
    const { productId, type } = req.body;

    const interaction = new Interaction({
      userId: req.user.id,
      productId,
      type,
    });

    await interaction.save();

    res.status(201).json({ message: 'Interaction tracked' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to track interaction' });
  }
};
