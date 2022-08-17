import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  phoneNumber: {
    type: String,
    minLength: 8,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

// Transformar los datos para quitar _id and __v.
contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.uid = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export const Contact = mongoose.model('Contact', contactSchema);
export default Contact;