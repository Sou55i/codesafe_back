const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const compression = require("compression");
const morgan = require("morgan");
require("dotenv").config({ path: ".env.production" });

const reviewsRouter = require("./routes/reviews");
const emailRouter = require("./routes/email");

const app = express();

// Vérification si Passenger est activé
if (typeof PhusionPassenger !== "undefined") {
  PhusionPassenger.configure({ autoInstall: false });
}

// Middlewares
app.use(helmet());
app.use(
  cors({
    origin: ["https://codesafe.fr"],
  })
);
app.use(compression());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(morgan("dev"));

// Routes
app.use("/api/reviews", reviewsRouter);
app.use("/api/send-email", emailRouter);

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée." });
});

// Gestion des erreurs globales
app.use((err, req, res, next) => {
  console.error("Erreur globale:", err);
  res.status(500).json({ message: "Erreur interne du serveur." });
});

// Lancement de l'application
if (typeof PhusionPassenger !== "undefined") {
  app.listen("passenger"); // Utilisation de Passenger
} else {
  app.listen(3000, () => {
    console.log("Serveur lancé sur le port 3000");
  });
}

module.exports = app;
