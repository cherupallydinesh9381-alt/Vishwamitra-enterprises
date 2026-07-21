const Product = require('../models/Product');
const Service = require('../models/Service');
const Brand = require('../models/Brand');
const Enquiry = require('../models/Enquiry');
const Contact = require('../models/Contact');

exports.getStats = async (req, res, next) => {
  try {
    const totalProducts = await Product.getTotalCount();
    const lowStockCount = await Product.getLowStockCount(5); // Threshold of 5 items
    const totalServices = await Service.getTotalCount();
    const totalBrands = await Brand.getTotalCount();
    
    const totalEnquiries = await Enquiry.getTotalCount();
    const pendingEnquiries = await Enquiry.getPendingCount();
    
    const totalContacts = await Contact.getTotalCount();
    const unreadContacts = await Contact.getUnreadCount();

    const recentEnquiries = await Enquiry.getRecent(5);
    const recentContacts = await Contact.getRecent(5);

    res.status(200).json({
      success: true,
      stats: {
        products: {
          total: totalProducts,
          lowStock: lowStockCount,
        },
        services: {
          total: totalServices,
        },
        brands: {
          total: totalBrands,
        },
        enquiries: {
          total: totalEnquiries,
          pending: pendingEnquiries,
        },
        contacts: {
          total: totalContacts,
          unread: unreadContacts,
        },
      },
      recentEnquiries,
      recentContacts,
    });
  } catch (error) {
    next(error);
  }
};
