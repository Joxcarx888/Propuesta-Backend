import Quiz from '../quiz/quiz.model.js';

export const createQuiz = async (req, res) => {
  const { title, description, category, course, level, questions } = req.body;

  try {
    const newQuiz = new Quiz({
      title,
      description,
      category,
      course,
      level,
      questions,
      createdBy: req.usuario._id,
    });

    await newQuiz.save();

    return res.status(201).json({
      success: true,
      message: 'Quiz created successfully!',
      quiz: newQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating quiz',
      error: error.message,
    });
  }
};

export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find()
      .populate('category', 'name')
      .populate('course', 'title')
      .populate('createdBy', 'username email');

    return res.status(200).json({
      success: true,
      quizzes: quizzes || []
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving quizzes',
      error: error.message
    });
  }
};

export const getQuizById = async (req, res) => {
  const { id } = req.params;

  try {
    const quiz = await Quiz.findById(id)
      .populate('category', 'name')
      .populate('course', 'title')
      .populate('createdBy', 'username email');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    return res.status(200).json({
      success: true,
      quiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving quiz',
      error: error.message,
    });
  }
};

export const updateQuiz = async (req, res) => {
  const { id } = req.params;
  const { title, description, category, course, level, questions } = req.body;

  try {
    const updatedQuiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description, category, course, level, questions },
      { new: true }
    );

    if (!updatedQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Quiz updated successfully!',
      quiz: updatedQuiz,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error updating quiz',
      error: error.message,
    });
  }
};

export const deleteQuiz = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);

    if (!deletedQuiz) {
      return res.status(404).json({
        success: false,
        message: 'Quiz not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Quiz deleted successfully!',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting quiz',
      error: error.message,
    });
  }
};
