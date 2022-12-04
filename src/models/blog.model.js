import mongoose, { SchemaTypes } from 'mongoose';

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
  user: { type: SchemaTypes.ObjectId, ref: 'User' }
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id;

    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Blog = new mongoose.model('Blog', blogSchema);

export default Blog;
