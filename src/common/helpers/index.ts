import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { genSalt, hash, compare } from "bcrypt";
import createHttpError from "http-errors";

/**
 * this function hashes user password
 * @param password user password
 * @returns the hashed password
 * @throws Error if hashing fails
 * @example
 * const hashed = await hashedPassword('password')
 * console.log(hashed)
 */
export const hashPassword = async (password: string) => {
  try {
    const saltRounds = await genSalt(10);
    return await hash(password, saltRounds);
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

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
export const comparePassword = async (password: string, hash: string) => {
    try {
        return await compare(password, hash);
    } catch (error) {
        throw new Error('Error comparing password');
    }
}

export const jwtSign = (obj: object) => {
    return jwt.sign(obj, `${process.env.JWT_SECRET}`, { expiresIn: '30d' })
};

export const jwtVerify = (token: string): any => {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
};


export const generateOTP = (len = 4) => {
  const characters = '0123456789';
  const charLength = characters.length;
  let otp = '';
  for(let i = 0; i < len; i++){
    otp += characters.charAt(Math.floor(Math.random() * charLength))
  };
  return otp;
};
