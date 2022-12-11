import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.Schema.Types.String,
    required: true,
    unique: true,
  },
  name: {
    type: mongoose.Schema.Types.String,
    minLength: 3,
    requited: true,
    unique: true
  },
  passwordHash: {
    type: mongoose.Schema.Types.String,
    minLength: 3,
    required: [true, 'Content is required'],
  },
  blogs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Blog' }],
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }]
});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

export const User = new mongoose.model('User', UserSchema);
export default User;
