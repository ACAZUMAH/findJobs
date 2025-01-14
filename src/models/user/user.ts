import { Schema, Types, model } from 'mongoose';
import { userDocument } from '../../common/Interfaces';

const userSchema = new Schema<userDocument>({
    username: { type: String, required: true },
    name: { type: String, minlentgh: 3, maxLength: 30, },
    email: { type: String, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAuthenticated: { type: Boolean, default: false }
}, { timestamps: true })

export const userModel = model('User', userSchema);
