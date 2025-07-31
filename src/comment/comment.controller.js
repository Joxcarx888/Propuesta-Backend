import Comment from './comment.model.js';

export const createComment = async (req, res) => {
  const { forumId } = req.params;
  const { content, parent } = req.body;

  try {
    const newComment = new Comment({
      forum: forumId,
      content,
      parent: parent || null,
      createdBy: req.usuario._id
    });

    await newComment.save();

    res.status(201).json({
      success: true,
      message: 'Comment added',
      comment: newComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error adding comment',
      error: error.message
    });
  }
};

export const getCommentsByForum = async (req, res) => {
  const { forumId } = req.params;

  try {
    const comments = await Comment.find({ forum: forumId })
      .populate('createdBy', 'username')
      .lean();

    const commentMap = {};
    comments.forEach(comment => (comment.replies = []));
    comments.forEach(comment => (commentMap[comment._id] = comment));

    const rootComments = [];

    comments.forEach(comment => {
      if (comment.parent) {
        commentMap[comment.parent]?.replies.push(comment);
      } else {
        rootComments.push(comment);
      }
    });

    res.status(200).json({
      success: true,
      comments: rootComments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching comments',
      error: error.message
    });
  }
};

export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  try {
    const updated = await Comment.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    ).populate('createdBy', 'username');

    res.json({
      success: true,
      message: 'Comment updated',
      comment: updated
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating comment',
      error: error.message
    });
  }
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;

  try {
    await Comment.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Comment deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting comment',
      error: error.message
    });
  }
};

