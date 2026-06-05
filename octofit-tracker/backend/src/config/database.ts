import mongoose from 'mongoose';

export const mongoUri =
  process.env.MONGO_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export const connectDatabase = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  return mongoose.connect(mongoUri);
};
