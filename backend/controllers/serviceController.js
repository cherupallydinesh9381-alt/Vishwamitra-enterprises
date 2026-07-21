const fs = require('fs');
const path = require('path');
const Service = require('../models/Service');

exports.getAllServices = async (req, res, next) => {
  try {
    const services = await Service.getAll();
    res.status(200).json({ success: true, services });
  } catch (error) {
    next(error);
  }
};

exports.getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }
    res.status(200).json({ success: true, service });
  } catch (error) {
    next(error);
  }
};

exports.createService = async (req, res, next) => {
  try {
    const { title, icon_name, description, price } = req.body;
    let image_url = null;
    if (req.file) {
      image_url = `/uploads/${req.file.filename}`;
    }

    const serviceId = await Service.create({
      title,
      icon_name,
      image_url,
      description,
      price,
    });

    const newService = await Service.findById(serviceId);
    res.status(201).json({ success: true, message: 'Service created successfully', service: newService });
  } catch (error) {
    next(error);
  }
};

exports.updateService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, icon_name, description, price } = req.body;

    const existingService = await Service.findById(id);
    if (!existingService) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    let image_url = existingService.image_url;
    if (req.file) {
      if (existingService.image_url && existingService.image_url.startsWith('/uploads/')) {
        const oldPath = path.join(__dirname, '..', existingService.image_url);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }
      image_url = `/uploads/${req.file.filename}`;
    }

    await Service.update(id, {
      title,
      icon_name,
      image_url,
      description,
      price,
    });

    const updatedService = await Service.findById(id);
    res.status(200).json({ success: true, message: 'Service updated successfully', service: updatedService });
  } catch (error) {
    next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found' });
    }

    if (service.image_url && service.image_url.startsWith('/uploads/')) {
      const imgPath = path.join(__dirname, '..', service.image_url);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await Service.delete(id);
    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (error) {
    next(error);
  }
};
