const Brand = require('../models/Brand');

exports.getAllBrands = async (req, res, next) => {
  try {
    const brands = await Brand.getAll();
    res.status(200).json({ success: true, brands });
  } catch (error) {
    next(error);
  }
};

exports.getBrandById = async (req, res, next) => {
  try {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }
    res.status(200).json({ success: true, brand });
  } catch (error) {
    next(error);
  }
};

exports.createBrand = async (req, res, next) => {
  try {
    const { name, icon_name, color, description } = req.body;

    const existingBrand = await Brand.findByName(name);
    if (existingBrand) {
      return res.status(400).json({ success: false, message: 'Brand with this name already exists' });
    }

    const brandId = await Brand.create({
      name,
      icon_name,
      color,
      description,
    });

    const newBrand = await Brand.findById(brandId);
    res.status(201).json({ success: true, message: 'Brand created successfully', brand: newBrand });
  } catch (error) {
    next(error);
  }
};

exports.updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, icon_name, color, description } = req.body;

    const existingBrand = await Brand.findById(id);
    if (!existingBrand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    if (name && name !== existingBrand.name) {
      const nameCheck = await Brand.findByName(name);
      if (nameCheck) {
        return res.status(400).json({ success: false, message: 'Brand with this name already exists' });
      }
    }

    await Brand.update(id, {
      name: name || existingBrand.name,
      icon_name: icon_name !== undefined ? icon_name : existingBrand.icon_name,
      color: color || existingBrand.color,
      description: description !== undefined ? description : existingBrand.description,
    });

    const updatedBrand = await Brand.findById(id);
    res.status(200).json({ success: true, message: 'Brand updated successfully', brand: updatedBrand });
  } catch (error) {
    next(error);
  }
};

exports.deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    await Brand.delete(id);
    res.status(200).json({ success: true, message: 'Brand deleted successfully' });
  } catch (error) {
    next(error);
  }
};
