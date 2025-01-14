import mongoose from "mongoose";
import { authDocument } from "../../common/Interfaces";

const authSchema = new mongoose.Schema<authDocument>({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    expiresIn: { type: Date, required: true }
})

export const authModal = mongoose.model('auth', authSchema)
