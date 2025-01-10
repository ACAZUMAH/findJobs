import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: true },
    token: { type: String, required: true },
    expiresIn: { type: Date, required: true }
})

export const authModal = mongoose.model('auth', authSchema)
