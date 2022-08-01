import mongoose from 'mongoose';

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;
const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASS}@openfullstack2022.ephxvav.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;


export const dbConnection = async () => {
  try {
    console.log('[MONGO ATLAS DB][STATUS]: Connecting...');
    mongoose.connect(MONGO_URL);
    console.log('[MONGO ATLAS DB][STATUS]: Connected');
  } catch (error) {
    console.log('[MONGO ATLAS DB][STATUS]: Error connetion');
    console.log(error);

    throw new Error('[MONGO ATLAS DB][STATUS]: Error connetion');
  }
};

export const dbCloseConnection = async () => {
  try {
    console.log('[MONGO ATLAS DB][STATUS]: Close connection');
    await mongoose.connection.close();
    console.log('[MONGO ATLAS DB][STATUS]: Unconnected');
  } catch (error) {
    console.log('[MONGO ATLAS DB][STATUS]: Erron in Unconnected');
    console.log(error);
  }
};

export default dbConnection;