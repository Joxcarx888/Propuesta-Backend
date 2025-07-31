import { Schema, model } from 'mongoose';

const CommentSchema = new Schema(
  {
    forum: {
      type: Schema.Types.ObjectId,
      ref: 'Forum',
      required: true
    },
    content: {
      type: String,
      required: true
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null 
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('Comment', CommentSchema);
