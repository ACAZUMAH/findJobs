"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUpdateJob = exports.validateJob = exports.validateLogin = exports.validateSignup = void 0;
const express_validator_1 = require("express-validator");
exports.validateSignup = [
    (0, express_validator_1.body)('name')
        .isString()
        .notEmpty()
        .withMessage('please provide your name')
        .isLength({ min: 3, max: 30 })
        .withMessage('name should be atleast 3 characters'),
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('please provide a valid email')
        .normalizeEmail()
        .notEmpty()
        .withMessage('please provide your email'),
    (0, express_validator_1.body)('password')
        .isString()
        .notEmpty()
        .withMessage('please provide your password')
        .isLength({ min: 6 })
        .withMessage('password should be atleast 6 characters'),
];
exports.validateLogin = [
    (0, express_validator_1.body)('email')
        .isEmail()
        .withMessage('please provide a valid email')
        .normalizeEmail()
        .notEmpty()
        .withMessage('please provide your email'),
    (0, express_validator_1.body)('password')
        .isString()
        .notEmpty()
        .withMessage('please provide your password'),
];
exports.validateJob = [
    (0, express_validator_1.body)('company')
        .isString()
        .notEmpty()
        .withMessage('please provide the company name')
        .isLength({ min: 3, max: 50 })
        .withMessage('company name should be atleast 3 characters'),
    (0, express_validator_1.body)('position')
        .isString()
        .notEmpty()
        .withMessage('please provide the position')
        .isLength({ min: 3, max: 100 })
        .withMessage('position should be atleast 3 characters'),
    (0, express_validator_1.body)('status')
        .isString()
        .notEmpty()
        .withMessage('please provide the status'),
    (0, express_validator_1.body)('salary')
        .isNumeric()
        .notEmpty()
        .withMessage('please provide salary')
];
exports.ValidateUpdateJob = [
    (0, express_validator_1.body)('company')
        .isString()
        .optional()
        .notEmpty()
        .withMessage('please provide the company name')
        .isLength({ min: 3, max: 50 })
        .withMessage('company name should be atleast 3 characters'),
    (0, express_validator_1.body)('position')
        .isString()
        .optional()
        .notEmpty()
        .withMessage('please provide the position')
        .isLength({ min: 3, max: 100 })
        .withMessage('position should be atleast 3 characters'),
    (0, express_validator_1.body)('status')
        .isString()
        .optional()
        .notEmpty()
        .withMessage('please provide the status'),
    (0, express_validator_1.body)('salary')
        .isString()
        .optional()
        .notEmpty()
        .withMessage('please provide salary')
];
//# sourceMappingURL=validate.js.map