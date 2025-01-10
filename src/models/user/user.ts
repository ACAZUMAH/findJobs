import { Schema, Types, model } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    name: { type: String, minlentgh: 3, maxLength: 30, },
    email: { type: String, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAuthenticated: { type: Boolean, default: false }
}, { timestamps: true })

export const userModal = model('User', userSchema);
