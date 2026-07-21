const Enquiry = require('../models/Enquiry');
const EmailService = require('../services/emailService');

exports.createEnquiry = async (req, res, next) => {
  try {
    const { name, phone, email, product_name, message } = req.body;

    const enquiryId = await Enquiry.create({
      name,
      phone,
      email,
      product_name,
      message,
    });

    const newEnquiry = await Enquiry.findById(enquiryId);

    // Notify admin via email asynchronously without blocking the response
    EmailService.sendAdminEnquiryNotification(newEnquiry).catch((err) => {
      console.error('Failed to send email notification:', err);
    });

    res.status(201).json({
      success: true,
      message: 'Enquiry submitted successfully! We will contact you shortly.',
      enquiry: newEnquiry,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllEnquiries = async (req, res, next) => {
  try {
    const enquiries = await Enquiry.getAll();
    res.status(200).json({ success: true, enquiries });
  } catch (error) {
    next(error);
  }
};

exports.updateEnquiryStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['pending', 'contacted', 'resolved'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const existingEnquiry = await Enquiry.findById(id);
    if (!existingEnquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    await Enquiry.updateStatus(id, status);
    const updatedEnquiry = await Enquiry.findById(id);

    res.status(200).json({
      success: true,
      message: `Enquiry status updated to ${status}`,
      enquiry: updatedEnquiry,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteEnquiry = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enquiry = await Enquiry.findById(id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found' });
    }

    await Enquiry.delete(id);
    res.status(200).json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    next(error);
  }
};
