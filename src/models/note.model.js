import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: { type: String, require: [true, 'Content is required'] },
  date: { type: Date, default: Date.now },
  important: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
});

// Transformar los datos para quitar _id and __v.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Note = mongoose.model('Note', noteSchema);
export default Note;