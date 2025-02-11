const express = require("express");
const router = express.Router();
const { getReviews } = require("../services/googlePlaces");

// Route pour récupérer les avis
router.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();
    res.json(reviews);
  } catch (error) {
    console.error("Erreur dans la route /api/reviews:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des avis." });
  }
});

module.exports = router;
