import Course from '../course/course.model.js';

export const createCourse = async (req, res) => {
  const { title, description, category, level } = req.body;

  try {
    const newCourse = new Course({
      title,
      description,
      category,
      level,
      createdBy: req.usuario._id,
    });

    await newCourse.save();

    return res.status(201).json({
      success: true,
      message: 'Course created successfully!',
      course: newCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message,
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find()
      .populate('category', 'name')
      .populate('createdBy', 'username email');

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving courses',
      error: error.message,
    });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;

  try {
    const course = await Course.findById(id)
      .populate('category', 'name')
      .populate('createdBy', 'username email');

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    return res.status(200).json({
      success: true,
      course,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving course',
      error: error.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, level } = req.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { title, description, category, level },
      { new: true }
    );

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Course updated successfully!',
      course: updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCourse = await Course.findByIdAndDelete(id);

    if (!deletedCourse) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Course deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting course',
      error: error.message,
    });
  }
};
