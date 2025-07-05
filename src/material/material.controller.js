import Material from './material.model.js';

export const createMaterial = async (req, res) => {
  const { title, description, content, category, course, level } = req.body;

  try {
    const newMaterial = new Material({
      title,
      description,
      content,
      category,
      course,
      level,
      createdBy: req.usuario._id,
    });

    await newMaterial.save();

    return res.status(201).json({
      success: true,
      message: 'Material created successfully!',
      material: newMaterial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating material',
      error: error.message,
    });
  }
};

export const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find()
      .populate('category', 'name')
      .populate('course', 'title')
      .populate('createdBy', 'username email');

    return res.status(200).json({
      success: true,
      materials,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving materials',
      error: error.message,
    });
  }
};

export const getMaterialById = async (req, res) => {
  const { id } = req.params;

  try {
    const material = await Material.findById(id)
      .populate('category', 'name')
      .populate('course', 'title')
      .populate('createdBy', 'username email');

    if (!material) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    return res.status(200).json({
      success: true,
      material,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving material',
      error: error.message,
    });
  }
};

export const updateMaterial = async (req, res) => {
  const { id } = req.params;
  const { title, description, content, category, course, level } = req.body;

  try {
    const updatedMaterial = await Material.findByIdAndUpdate(
      id,
      { title, description, content, category, course, level },
      { new: true }
    );

    if (!updatedMaterial) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Material updated successfully!',
      material: updatedMaterial,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating material',
      error: error.message,
    });
  }
};

export const deleteMaterial = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMaterial = await Material.findByIdAndDelete(id);

    if (!deletedMaterial) {
      return res.status(404).json({
        success: false,
        message: 'Material not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Material deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting material',
      error: error.message,
    });
  }
};