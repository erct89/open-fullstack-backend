import Config from '../utils/config.js';
import mongoose from 'mongoose';
import Logger from '../utils/logger.js';

export const dbConnection = async () => {
  try {
    Logger.info('[MONGO ATLAS DB][STATUS]: Connecting...');

    mongoose.connect(Config.MONGO_URL);

    Logger.info('[MONGO ATLAS DB][STATUS]: Connected');
  } catch (error) {
    Logger.info('[MONGO ATLAS DB][STATUS]: Error connetion');
    Logger.info(error);

    throw new Error('[MONGO ATLAS DB][STATUS]: Error connetion');
  }
};

export const dbCloseConnection = async () => {
  try {
    Logger.info('[MONGO ATLAS DB][STATUS]: Close connection');
    await mongoose.connection.close();
    Logger.info('[MONGO ATLAS DB][STATUS]: Unconnected');
  } catch (error) {
    Logger.info('[MONGO ATLAS DB][STATUS]: Erron in Unconnected');
    Logger.info(error);
  }
};

export default dbConnection;