"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = exports.jwtVerify = exports.jwtSign = exports.comparePassword = exports.hashPassword = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = require("bcrypt");
/**
 * this function hashes user password
 * @param password user password
 * @returns the hashed password
 * @throws Error if hashing fails
 * @example
 * const hashed = await hashedPassword('password')
 * console.log(hashed)
 */
const hashPassword = async (password) => {
    try {
        const saltRounds = await (0, bcrypt_1.genSalt)(10);
        return await (0, bcrypt_1.hash)(password, saltRounds);
    }
    catch (error) {
        throw new Error("Error hashing password");
    }
};
exports.hashPassword = hashPassword;
/**
 * this function compares user password with hashed password
 * @param password password received login details
 * @param hash hashed password from database
 * @returns true if password matches, false otherwise
 * @throws Error if comparison fails
 * @example
 * const isMatch = await comparePass('password', 'hashedPassword')
 * console.log(isMatch)
 */
const comparePassword = async (password, hash) => {
    try {
        return await (0, bcrypt_1.compare)(password, hash);
    }
    catch (error) {
        throw new Error('Error comparing password');
    }
};
exports.comparePassword = comparePassword;
const jwtSign = (obj) => {
    return jsonwebtoken_1.default.sign(obj, `${process.env.JWT_SECRET}`, { expiresIn: '30d' });
};
exports.jwtSign = jwtSign;
const jwtVerify = (token) => {
    return jsonwebtoken_1.default.verify(token, `${process.env.JWT_SECRET}`);
};
exports.jwtVerify = jwtVerify;
const generateOTP = (len = 4) => {
    const characters = '0123456789';
    const charLength = characters.length;
    let otp = '';
    for (let i = 0; i < len; i++) {
        otp += characters.charAt(Math.floor(Math.random() * charLength));
    }
    ;
    return otp;
};
exports.generateOTP = generateOTP;
//# sourceMappingURL=index.js.map