import mongoose, { Schema, SchemaTypes } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: SchemaTypes.String,
    unique: true
  },
  userName: {
    type: SchemaTypes.String,
    minLength: 3,
    required: [true, 'Content is required'],
    unique: true
  },
  passwordHash: {
    type: SchemaTypes.String,
    required: [true, 'Content is required'],
  },
  blogs: [{ type: SchemaTypes.ObjectId, ref: 'Blog' }],
  notes: [{ type: SchemaTypes.ObjectId, ref: 'Note' }]
});

UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

export const User = mongoose.model('User', UserSchema);
export default User;
