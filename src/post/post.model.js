import { Schema, model } from 'mongoose';

const PostSchema = new Schema(
  {
    forum: {
      type: Schema.Types.ObjectId,
      ref: 'Forum',
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    parentPost: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('Post', PostSchema);
