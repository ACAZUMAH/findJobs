"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIdAndUpdate = exports.getUserByPhone = exports.findUserByEmail = exports.updateisAuthenticated = exports.getUserById = exports.checkUserExists = exports.createUser = void 0;
const models_1 = require("../../models");
const http_errors_1 = __importDefault(require("http-errors"));
const mongoose_1 = require("mongoose");
const validators_1 = require("./validators");
/**
 * this function creates a new user and returns the created user
 * @param data - user information
 * @returns  created user
 * @throws  InternalServerError if user creation fails
 */
const createUser = async (data) => {
    (0, validators_1.validateCreateUserData)(data);
    const user = await models_1.userModel.create({ ...data });
    if (!user)
        throw new http_errors_1.default.InternalServerError('User creation failed');
    return user;
};
exports.createUser = createUser;
/**
 * this function checks if a user exists in the database during registration
 * @param email - user email
 * @throws  BadRequest if user exists
 */
const checkUserExists = async (email, phone) => {
    const user = await models_1.userModel.findOne({ $or: [{ email, phone }] });
    if (user)
        throw new http_errors_1.default.BadRequest('User already exists');
};
exports.checkUserExists = checkUserExists;
/**
 * get user by id
 * @param id - user's id
 * @returns found user
 */
const getUserById = async (id) => {
    if (!mongoose_1.Types.ObjectId.isValid(id))
        throw new http_errors_1.default.BadRequest('Invalid user id');
    const data = await models_1.userModel.findById(id, { __v: 0 });
    if (!data)
        throw new http_errors_1.default.NotFound('User not found');
    return data;
};
exports.getUserById = getUserById;
/**
 * update isAuthenticated after signup
 * @param id - user's id
 * @returns updated user
 */
const updateisAuthenticated = async (id) => {
    const update = await models_1.userModel.findByIdAndUpdate(id, { isAuthenticated: true }, { new: true });
    if (!update)
        throw Error('Internal Server Error');
    return update;
};
exports.updateisAuthenticated = updateisAuthenticated;
/**
 * this function finds a user by email
 * @param email - user email
 * @returns  user
 * @throws  BadRequest if user does not exist
 */
const findUserByEmail = async (email) => {
    const user = await models_1.userModel.findOne({ email });
    if (!user)
        throw new http_errors_1.default.BadRequest('No user with this email');
    return user;
};
exports.findUserByEmail = findUserByEmail;
/**
 * get user by phone number
 * @param phone - phone number
 * @returns found user
 */
const getUserByPhone = async (phone) => {
    const user = await models_1.userModel.findOne({ phone });
    if (!user)
        throw new http_errors_1.default.BadRequest("No user with this phone number");
    return user;
};
exports.getUserByPhone = getUserByPhone;
/**
 * find user by id and update
 * @param data - user's info
 * @returns updated user
 */
const getUserByIdAndUpdate = async (data) => {
    if (!mongoose_1.Types.ObjectId.isValid(data.id))
        throw new http_errors_1.default.BadRequest('Invalid user Id');
    (0, validators_1.validateUpdateUserData)(data);
    const update = await models_1.userModel.findByIdAndUpdate({ _id: data.id }, { ...data });
    if (!update)
        throw new http_errors_1.default.NotFound('Unable to update user');
    return update;
};
exports.getUserByIdAndUpdate = getUserByIdAndUpdate;
//# sourceMappingURL=index.js.map