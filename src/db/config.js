import mongoose from 'mongoose';

const MONGO_URL = process.env.MONGO_URL;

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