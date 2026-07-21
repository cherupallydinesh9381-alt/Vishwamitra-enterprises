const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

let transporter;

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: parseInt(process.env.EMAIL_PORT || '587') === 465, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
} else {
  // Fallback console transporter for development when SMTP credentials are not yet configured
  transporter = {
    sendMail: async (mailOptions) => {
      console.log('--- DEVELOPMENT MAIL TRANSPORTER LOG ---');
      console.log('From:', mailOptions.from);
      console.log('To:', mailOptions.to);
      console.log('Subject:', mailOptions.subject);
      console.log('Text Content:', mailOptions.text);
      console.log('HTML Content:', mailOptions.html);
      console.log('-----------------------------------------');
      return { messageId: 'dev-mode-mock-id' };
    }
  };
}

module.exports = transporter;
