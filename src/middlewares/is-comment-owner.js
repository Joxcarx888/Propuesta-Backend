import Comment from '../comment/comment.model.js';

export const isCommentOwner = async (req, res, next) => {
  const { id } = req.params;
  const userId = req.usuario._id;

  try {
    const comment = await Comment.findById(id);

    if (!comment) {
      return res.status(404).json({ msg: 'Comment not found' });
    }

    if (comment.createdBy.toString() !== userId.toString()) {
      return res.status(403).json({ msg: 'You are not the owner of this comment' });
    }

    req.comment = comment; 
    next();
  } catch (error) {
    res.status(500).json({ msg: 'Error verifying comment owner', error: error.message });
  }
};
