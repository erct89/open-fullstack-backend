import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {type: String, required: true, maxLength: 50 },
  number: {type: String, required: true, maxLength: 9, minLenght: 9 },
  date: {type: Date, default: Date.now}
});

export const Contact = mongoose.model('Contact', contactSchema);
export default Contact;