import mongoose, { ConnectOptions } from 'mongoose';

import { NODE_ENV, DB_HOST, DB_PORT, DB_DATABASE, DB_URL } from '@config';
import { logger } from '@/utils/logger';

export const connectMongodb = async () => {
  try {
    const mongoURI = DB_URL || `mongodb://${DB_HOST}:${DB_PORT}/${DB_DATABASE}`;
    const mongoOptions: ConnectOptions = {
      connectTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    };

    if (NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }

    const db = await mongoose.connect(mongoURI, mongoOptions);
    logger.info(`Connected to MongoDB at ${db.connection.host}`);
  } catch (error) {
    console.error(error);
    console.error(error.message);
    process.exit(1);
  }
};
