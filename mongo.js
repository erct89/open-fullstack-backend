import mongoose from 'mongoose';

const DB_USER = 'db-admin-ofs';
const DB_PASS = '0EHOQqFQu5feZlEh';
const DB_NAME = 'OFS_DB';
const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@openfullstack2022.ephxvav.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGO_URL);

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean
});

const Note = mongoose.model('Note', noteSchema);
const note = new  Note({
  content: 'Esto es una prueba de connexion',
  date: new Date(),
  important: false
});

note.save().then(() => {
  mongoose.connection.close();
});