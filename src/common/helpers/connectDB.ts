import { logger } from "../../logger";
import mongoose from "mongoose";

export const connectDB = async (url: string) => {
    mongoose.connection.on('connected', () => {
        logger.info('connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        logger.error('Database error', err);
    });

    mongoose.connection.on('disconnected', (err) => {
        logger.error('Database disconnected', err);
    });

    await mongoose.connect(url);
};

