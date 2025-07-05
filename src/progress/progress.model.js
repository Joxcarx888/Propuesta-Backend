import { Schema, model } from 'mongoose';

const ProgressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    material: {
      type: Schema.Types.ObjectId,
      ref: 'Material'
    },
    quiz: {
      type: Schema.Types.ObjectId,
      ref: 'Quiz'
    },
    completed: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: null
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export default model('Progress', ProgressSchema);
