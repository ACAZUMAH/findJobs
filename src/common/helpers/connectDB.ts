import mongoose from "mongoose";

export const connectDB = async (url: string) => {
    mongoose.connection.on('connected', () => {
        console.info('connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
        console.error('Database error', err);
    });

    mongoose.connection.on('disconnected', (err) => {
        console.error('Database disconnected', err);
    });

    await mongoose.connect(url);
};

