const transporter = require('../config/mail');
const dotenv = require('dotenv');

dotenv.config();

const adminEmail = process.env.EMAIL_USER || 'vishwamitraenterprises26@gmail.com';

class EmailService {
  static async sendAdminEnquiryNotification(enquiryData) {
    const { name, phone, email, product_name, message } = enquiryData;
    const mailOptions = {
      from: process.env.EMAIL_FROM || adminEmail,
      to: adminEmail,
      subject: `New Product Enquiry: ${product_name} from ${name}`,
      text:
        `You have received a new product enquiry.\n\n` +
        `Details:\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Email: ${email}\n` +
        `Product Interested In: ${product_name}\n\n` +
        `Message:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dde1ea; border-radius: 8px;">
          <h2 style="color: #d4af37; border-bottom: 2px solid #d4af37; padding-bottom: 10px;">New Product Enquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Product Interested In:</strong> ${product_name}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f4f5f8; padding: 15px; border-left: 4px solid #d4af37; border-radius: 4px; color: #0a0e1a; white-space: pre-wrap;">${message}</div>
          <hr style="border: 0; border-top: 1px solid #dde1ea; margin: 20px 0;" />
          <p style="font-size: 0.85rem; color: #5a6178; text-align: center;">This notification was automatically sent by the Vishwamitra Enterprises website server.</p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Admin Enquiry Notification Email Sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending admin enquiry email:', error);
      return false;
    }
  }

  static async sendAdminContactNotification(contactData) {
    const { name, email, phone, message } = contactData;
    const mailOptions = {
      from: process.env.EMAIL_FROM || adminEmail,
      to: adminEmail,
      subject: `New Contact Form Submission from ${name}`,
      text:
        `You have received a new contact submission.\n\n` +
        `Details:\n` +
        `Name: ${name}\n` +
        `Email: ${email}\n` +
        `Phone: ${phone || 'N/A'}\n\n` +
        `Message:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dde1ea; border-radius: 8px;">
          <h2 style="color: #0a0e1a; border-bottom: 2px solid #0a0e1a; padding-bottom: 10px;">New Contact Form Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: #f4f5f8; padding: 15px; border-left: 4px solid #0a0e1a; border-radius: 4px; color: #0a0e1a; white-space: pre-wrap;">${message}</div>
          <hr style="border: 0; border-top: 1px solid #dde1ea; margin: 20px 0;" />
          <p style="font-size: 0.85rem; color: #5a6178; text-align: center;">This notification was automatically sent by the Vishwamitra Enterprises website server.</p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Admin Contact Notification Email Sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending admin contact email:', error);
      return false;
    }
  }

  static async sendAdminPasswordReset(email, resetUrl) {
    const mailOptions = {
      from: process.env.EMAIL_FROM || adminEmail,
      to: email,
      subject: `Password Reset Request - Vishwamitra Enterprises Admin Dashboard`,
      text: `You requested a password reset for the Vishwamitra Enterprises Admin Dashboard. Please reset it by visiting:\n\n${resetUrl}\n\nThis link is valid for 1 hour.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dde1ea; border-radius: 8px;">
          <h2 style="color: #d4af37;">Password Reset Request</h2>
          <p>You requested to reset your password for the Admin Dashboard at Vishwamitra Enterprises.</p>
          <p>Please click the button below to set a new password. This link is valid for 1 hour:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background-color: #d4af37; color: #0a0e1a; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 25px; display: inline-block;">Reset Password</a>
          </div>
          <p>If the button doesn't work, copy and paste this link in your browser URL bar:</p>
          <p style="word-break: break-all; background-color: #f4f5f8; padding: 10px; border-radius: 4px; font-size: 0.9rem;">${resetUrl}</p>
          <p>If you did not request a password reset, please ignore this email or contact support if you have concerns.</p>
          <hr style="border: 0; border-top: 1px solid #dde1ea; margin: 20px 0;" />
          <p style="font-size: 0.85rem; color: #5a6178; text-align: center;">Vishwamitra Enterprises Admin Portal</p>
        </div>
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Password Reset Email Sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending password reset email:', error);
      return false;
    }
  }
}

module.exports = EmailService;
