import { Schema, model } from 'mongoose';

const MaterialSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'El título es obligatorio'],
      maxLength: [100, 'El título no puede tener más de 100 caracteres'],
    },
    description: {
      type: String,
      required: [true, 'La descripción es obligatoria'],
      maxLength: [500, 'La descripción no puede exceder los 500 caracteres'],
    },
    category: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: ['Matemáticas', 'Física', 'Comprensión Lectora', 'Química', 'Biología', 'Historia', 'Lenguaje'],
    },
    content: {
      type: String,
      required: [true, 'La URL del contenido es obligatoria'],
    },
    level: {
      type: String,
      required: [true, 'El nivel es obligatorio'],
      enum: ['Principiante', 'Intermedio', 'Avanzado'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Debe indicar quién subió el material'],
    },
    estado: {
      type: Boolean,
      default: true, 
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model('Material', MaterialSchema);
