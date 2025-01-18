import { Types } from 'mongoose';
import jwt from 'jsonwebtoken';
import { genSalt, hash, compare } from "bcrypt";

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

/**
 * 
 * @param obj 
 * @returns 
 */
export const jwtSign = (obj: object) => {
    return jwt.sign(obj, `${process.env.JWT_SECRET}`, { expiresIn: '30d' })
};

/**
 * 
 * @param token 
 * @returns 
 */
export const jwtVerify = (token: string): any => {
    return jwt.verify(token, `${process.env.JWT_SECRET}`);
};

/**
 * 
 * @param len 
 * @returns 
 */
export const generateOTP = (len = 4) => {
  const characters = '0123456789';
  const charLength = characters.length;
  let otp = '';
  for(let i = 0; i < len; i++){
    otp += characters.charAt(Math.floor(Math.random() * charLength))
  };
  return otp;
};

/**
 * 
 * @param limit 
 * @returns 
 */
export const getSanitizeLimit = (limit?: string | number | null) => {
  const limitNumber = Number(limit);
  if(Number.isNaN(limitNumber)) return 10;
  return Math.min(Math.max(limitNumber, 1), 100);
};

/**
 * 
 * @param page 
 */
export const getSanitizePage = (page?: string | number | null) => {
  const pageNumber = Number(page);
  if(Number.isNaN(pageNumber)) return 1;
  return Math.max(pageNumber, 1)
};

/**
 * 
 * @param page 
 * @param limit 
 * @returns 
 */
export const getSanitizeOffset = (page: number, limit: number) => {
  return (page - 1) * limit;
};

export const getPageConnection = <T>(data: Array<T>, page: number, limit: number) => {
  const hasNextPage = data.length > limit;
  const edges = hasNextPage ? data.slice(0, limit) : data;
  const pageInfo = { page, limit, total: data.length, hasNextPage };
  return { data: edges, info: pageInfo }
};