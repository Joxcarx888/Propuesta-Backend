import Progress from '../progress/progress.model.js';
import Quiz from '../quiz/quiz.model.js';
import Material from '../material/material.model.js';

export const getUserProgressSummary = async (req, res) => {
  const { userId } = req.params;

  try {
    const totalMaterials = await Material.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();

    const completedMaterials = await Progress.countDocuments({
      user: userId,
      material: { $ne: null },
      completed: true
    });

    const completedQuizzes = await Progress.countDocuments({
      user: userId,
      quiz: { $ne: null },
      completed: true
    });

    const materialProgress = totalMaterials === 0 ? 0 : (completedMaterials / totalMaterials) * 100;
    const quizProgress = totalQuizzes === 0 ? 0 : (completedQuizzes / totalQuizzes) * 100;

    return res.status(200).json({
      success: true,
      user: userId,
      totalMaterials,
      completedMaterials,
      materialProgress,
      totalQuizzes,
      completedQuizzes,
      quizProgress
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error calculating progress summary',
      error: error.message
    });
  }
};

export const createProgress = async (req, res) => {
  const { user, material, quiz, completed, score } = req.body;

  try {
    const newProgress = new Progress({ user, material, quiz, completed, score });
    await newProgress.save();

    return res.status(201).json({
      success: true,
      message: 'Progress record created successfully!',
      progress: newProgress
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating progress record',
      error: error.message
    });
  }
};

export const getAllProgress = async (req, res) => {
  try {
    const progresses = await Progress.find()
      .populate('user', 'username email')
      .populate('material', 'title')
      .populate('quiz', 'title');

    return res.status(200).json({
      success: true,
      progresses
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving progress records',
      error: error.message
    });
  }
};

export const getProgressById = async (req, res) => {
  const { id } = req.params;

  try {
    const progress = await Progress.findById(id)
      .populate('user', 'username email')
      .populate('material', 'title')
      .populate('quiz', 'title');

    if (!progress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found'
      });
    }

    return res.status(200).json({
      success: true,
      progress
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving progress record',
      error: error.message
    });
  }
};

export const updateProgress = async (req, res) => {
  const { id } = req.params;
  const { completed, score } = req.body;

  try {
    const updatedProgress = await Progress.findByIdAndUpdate(
      id,
      { completed, score },
      { new: true }
    );

    if (!updatedProgress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Progress record updated successfully!',
      progress: updatedProgress
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating progress record',
      error: error.message
    });
  }
};

export const deleteProgress = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProgress = await Progress.findByIdAndDelete(id);

    if (!deletedProgress) {
      return res.status(404).json({
        success: false,
        message: 'Progress record not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Progress record deleted successfully!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting progress record',
      error: error.message
    });
  }
};
