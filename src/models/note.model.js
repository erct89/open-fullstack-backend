import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: { type: String, require: [true, 'Content is required'] },
  date: { type: Date, default: Date.now },
  important: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
});

export const Note = mongoose.model('Note', noteSchema);
export default Note;