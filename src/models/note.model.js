import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLenght: 5,
    required: [true, 'Content is required'],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  important: { type: Boolean, default: false },
  delete: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Transformar los datos para quitar _id and __v.
noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

/**
 * Middleware to populate user
 * @param {Array[Object]} docs
 * @param {Function} next
 */
const populateUsersMiddleware = async (docs, next) => {
  for(let doc of docs) {
    await doc.populate('user', { name: 1, email: 1 });
  }

  next();
};

/**
 * Middleware to populate user
 * @param {Object} doc
 * @param {Function} next
 */
const populateUserMiddleware = async (doc, next) => {
  if (doc) {
    await doc.populate('user', { name: 1, email: 1 });
  }

  next();
};

noteSchema.post(['find', 'findById'], populateUsersMiddleware);
noteSchema.post(['save', 'findOne', 'findOneAndDelete', 'findOneAndRemove', 'findOneAndReplace'], populateUserMiddleware);

export const Note = mongoose.model('Note', noteSchema);
export default Note;