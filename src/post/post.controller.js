import Post from '../post/post.model.js';

export const createPost = async (req, res) => {
  const { forum, content, parentPost } = req.body;

  try {
    const newPost = new Post({
      forum,
      user: req.usuario._id,
      content,
      parentPost: parentPost || null
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      message: 'Post created successfully!',
      post: newPost
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error creating post',
      error: error.message
    });
  }
};

export const getPostsByForum = async (req, res) => {
  const { forumId } = req.params;

  try {
    const posts = await Post.find({ forum: forumId })
      .populate('user', 'username')
      .populate('parentPost', 'content user');

    return res.status(200).json({
      success: true,
      posts
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error retrieving posts',
      error: error.message
    });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: 'Post not found'
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully!'
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error deleting post',
      error: error.message
    });
  }
};
