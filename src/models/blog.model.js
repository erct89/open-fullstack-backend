import mongoose from 'mongoose';

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

const blogSchema = new mongoose.Schema({
  author: {
    type: String,
    minLength: 3,
    required: true
  },
  title: {
    type: String,
    minLength: 3,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    default: 0,
    required: true
  },
  create: {
    type: Date,
    default: Date.now,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id;

    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

blogSchema.post(['find', 'findById'], populateUsersMiddleware);
blogSchema.post(['save', 'findOne', 'findOneAndDelete', 'findOneAndRemove', 'findOneAndReplace'], populateUserMiddleware);

export const Blog = new mongoose.model('Blog', blogSchema);

export default Blog;
