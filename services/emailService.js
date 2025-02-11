const nodemailer = require("nodemailer");
const { JSDOM } = require("jsdom");
const domPurify = require("dompurify")(new JSDOM().window);

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVICE,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // À revoir en production
  },
});

async function sendEmail({ name, phone, email, subject, message }) {
  const mailBody = `
    Nom: ${domPurify.sanitize(name)}
    Téléphone: ${domPurify.sanitize(phone)}
    Email: ${domPurify.sanitize(email)}
    Sujet: ${domPurify.sanitize(subject)}
    Message: ${domPurify.sanitize(message)}
  `;

  const mailOptions = {
    from: "contact@codesafe.fr",
    to: "contact@codesafe.fr",
    subject: subject,
    text: mailBody,
    replyTo: email,
  };

  await transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
