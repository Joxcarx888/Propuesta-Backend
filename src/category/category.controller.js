import Category from '../category/category.model.js'; 

export const createCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const newCategory = new Category({ name, description });
    await newCategory.save();
    
    return res.status(201).json({
      success: true,
      message: 'Category created successfully!',
      category: newCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating category',
      error: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving categories',
      error: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      category,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving category',
      error: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, { name, description }, { new: true });
    
    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category updated successfully!',
      category: updatedCategory,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating category',
      error: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: 'Category not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Category deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting category',
      error: error.message,
    });
  }
};
