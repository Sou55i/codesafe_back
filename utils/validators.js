function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateEmailRequest({ name, phone, email, subject, message }) {
  const errors = [];

  if (!name) errors.push("Le nom est obligatoire.");
  if (!phone) errors.push("Le téléphone est obligatoire.");
  if (!email) {
    errors.push("L'email est obligatoire.");
  } else if (!isValidEmail(email)) {
    errors.push("L'email n'est pas valide.");
  }
  if (!subject) errors.push("Le sujet est obligatoire.");
  if (!message) errors.push("Le message est obligatoire.");
  if (phone && phone.length !== 10)
    errors.push("Le numéro de téléphone doit contenir 10 chiffres.");
  if (message && message.length > 500)
    errors.push("Le message est trop long (max 500 caractères).");

  return errors;
}

module.exports = { validateEmailRequest };
