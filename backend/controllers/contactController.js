const Contact = require('../models/Contact');
const EmailService = require('../services/emailService');

exports.createContact = async (req, res, next) => {
  try {
    const { name, email, phone, message } = req.body;

    const contactId = await Contact.create({
      name,
      email,
      phone,
      message,
    });

    const newContact = await Contact.findById(contactId);

    // Notify admin via email asynchronously without blocking response
    EmailService.sendAdminContactNotification(newContact).catch((err) => {
      console.error('Failed to send email notification:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will contact you soon.',
      contact: newContact,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.getAll();
    res.status(200).json({ success: true, contacts });
  } catch (error) {
    next(error);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['unread', 'read', 'archived'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const existingContact = await Contact.findById(id);
    if (!existingContact) {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }

    await Contact.updateStatus(id, status);
    const updatedContact = await Contact.findById(id);

    res.status(200).json({
      success: true,
      message: `Contact status updated to ${status}`,
      contact: updatedContact,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact message not found' });
    }

    await Contact.delete(id);
    res.status(200).json({ success: true, message: 'Contact message deleted successfully' });
  } catch (error) {
    next(error);
  }
};
