"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserLoader = void 0;
const dataloader_1 = __importDefault(require("dataloader"));
const models_1 = require("../models");
const createUserLoader = () => {
    const getUserByIds = async (ids) => {
        const users = await models_1.userModel.find({ _id: { $in: ids } });
        return ids.map((id) => users.find((user) => user._id.toString() === id));
    };
    return new dataloader_1.default(getUserByIds);
};
exports.createUserLoader = createUserLoader;
//# sourceMappingURL=users.js.map