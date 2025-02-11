const express = require("express");
const router = express.Router();
const { sendEmail } = require("../services/emailService");
const { validateEmailRequest } = require("../utils/validators");

// Route pour envoyer un e-mail
router.post("/", async (req, res) => {
  const { name, phone, email, subject, message } = req.body;

  // Validation des données
  const errors = validateEmailRequest(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ message: errors.join("\n") });
  }

  try {
    await sendEmail({ name, phone, email, subject, message });
    res.json({ message: "Email envoyé avec succès!" });
  } catch (error) {
    console.error("Erreur dans la route /api/send-email:", error);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail." });
  }
});

module.exports = router;
