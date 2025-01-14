"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const authSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
    token: { type: String, required: true },
    expiresIn: { type: Date, required: true }
});
exports.authModal = mongoose_1.default.model('auth', authSchema);
//# sourceMappingURL=index.js.map