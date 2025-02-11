const axios = require("axios");

const GOOGLE_PLACES_API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const GOOGLE_PLACE_ID = process.env.GOOGLE_PLACE_ID;

// Cache en mémoire pour les avis
let cachedReviews = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 heure

async function getReviews() {
  // Vérification des variables d'environnement
  if (!GOOGLE_PLACES_API_KEY || !GOOGLE_PLACE_ID) {
    throw new Error("Configuration API Google manquante.");
  }

  // Utilisation du cache si valide
  if (cachedReviews && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedReviews;
  }

  // Appel à l'API Google Places
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${GOOGLE_PLACE_ID}&fields=review&key=${GOOGLE_PLACES_API_KEY}&language=fr`;
  const response = await axios.get(url);
  const data = response.data;

  // Vérification de la réponse de l'API
  if (data.status !== "OK" || !data.result || !data.result.reviews) {
    throw new Error("Aucun avis trouvé dans la réponse de l'API.");
  }

  // Mise en cache des avis
  cachedReviews = data.result.reviews.map((review) => ({
    author_name: review.author_name,
    rating: review.rating,
    text: review.text,
  }));
  lastFetchTime = Date.now();

  return cachedReviews;
}

module.exports = { getReviews };
