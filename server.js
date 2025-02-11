const app = require("./app");

// Augmenter la taille maximale de la mémoire allouée à Node.js
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Serveur sécurisé en écoute sur le port ${port}`);
});
