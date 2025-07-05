import Forum from '../forum/forum.model.js';

export const createForum = async (req, res) => {
  const { title, description, category } = req.body;

  try {
    const newForum = new Forum({
      title,
      description,
      category,
      createdBy: req.usuario._id
    });

    await newForum.save();

    return res.status(201).json({
      success: true,
      message: 'Forum created successfully!',
      forum: newForum
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating forum',
      error: error.message
    });
  }
};

export const getAllForums = async (req, res) => {
  try {
    const forums = await Forum.find()
      .populate('category', 'name')
      .populate('createdBy', 'username');

    return res.status(200).json({
      success: true,
      forums
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving forums',
      error: error.message
    });
  }
};

export const getForumById = async (req, res) => {
  const { id } = req.params;

  try {
    const forum = await Forum.findById(id)
      .populate('category', 'name')
      .populate('createdBy', 'username');

    if (!forum) {
      return res.status(404).json({
        success: false,
        message: 'Forum not found'
      });
    }

    return res.status(200).json({
      success: true,
      forum
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving forum',
      error: error.message
    });
  }
};

export const deleteForum = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedForum = await Forum.findByIdAndDelete(id);

    if (!deletedForum) {
      return res.status(404).json({
        success: false,
        message: 'Forum not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Forum deleted successfully!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting forum',
      error: error.message
    });
  }
};

export const updateForum = async (req, res) => {
  const { id } = req.params;
  const { title, description, category } = req.body;

  try {
    const updatedForum = await Forum.findByIdAndUpdate(
      id,
      { title, description, category },
      { new: true }
    )
      .populate('category', 'name')
      .populate('createdBy', 'username');

    if (!updatedForum) {
      return res.status(404).json({
        success: false,
        message: 'Forum not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Forum updated successfully!',
      forum: updatedForum
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating forum',
      error: error.message
    });
  }
};