"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    name: { type: String, minlentgh: 3, maxLength: 30, },
    email: { type: String, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAuthenticated: { type: Boolean, default: false }
}, { timestamps: true });
exports.userModel = (0, mongoose_1.model)('User', userSchema);
//# sourceMappingURL=user.js.map