import User from './user.model.js';

export const changeUserRole = async (req, res) => {
  const { uid } = req.params;
  const { role } = req.body;

  const validRoles = ['ADMIN', 'TUTOR', 'STUDENT'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({
      msg: `Invalid role. Valid roles are: ${validRoles.join(', ')}`,
    });
  }

  try {
    const user = await User.findByIdAndUpdate(
      uid,
      { role },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json({
      msg: 'Role updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};

export const getUsers = async (req, res) => {
  const { limit = 10, offset = 0 } = req.query;

  try {
    const [total, users] = await Promise.all([
      User.countDocuments({ estado: true }),
      User.find({ estado: true })
        .skip(Number(offset))
        .limit(Number(limit))
        .select('-password') 
    ]);

    res.json({
      total,
      users,
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error', error });
  }
};
