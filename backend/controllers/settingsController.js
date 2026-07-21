const Setting = require('../models/Setting');

exports.getSettings = async (req, res, next) => {
  try {
    const settings = await Setting.getAll();
    res.status(200).json({ success: true, settings });
  } catch (error) {
    next(error);
  }
};

exports.updateSettings = async (req, res, next) => {
  try {
    const newSettings = req.body;

    if (!newSettings || typeof newSettings !== 'object' || Array.isArray(newSettings)) {
      return res.status(400).json({ success: false, message: 'Invalid settings format' });
    }

    await Setting.updateMany(newSettings);
    const updatedSettings = await Setting.getAll();

    res.status(200).json({
      success: true,
      message: 'Settings updated successfully',
      settings: updatedSettings,
    });
  } catch (error) {
    next(error);
  }
};
