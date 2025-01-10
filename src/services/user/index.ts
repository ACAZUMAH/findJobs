import { userModal } from '../../models';
import createError from 'http-errors';
import { Types } from 'mongoose';
import { authInput } from '../../common/Interfaces';

/**
 * this function creates a new user and returns the created user
 * @param data  user information
 * @returns  created user
 * @throws  InternalServerError if user creation fails
 */
export const createUser = async (data: authInput) => {
    const user = await userModal.create({ ...data });
    if(!user) throw new createError.InternalServerError('User creation failed');
    return user;
};

/**
 * this function checks if a user exists in the database during registration
 * @param email  user email
 * @throws  BadRequest if user exists
 */
export const checkUserExists = async (email?: string, phone?: string) => {
    const user = await userModal.findOne({ $or: [{ email, phone }]  })
    if(user) throw new createError.BadRequest('User already exists');
};

/**
 * 
 * @param id 
 * @returns 
 */
export const getUserById = async (id: string | Types.ObjectId) => {
    if(!Types.ObjectId.isValid(id)) 
        throw new createError.BadRequest('Invalid user id');
    const data = await userModal.findById(id);
    if(!data) throw new createError.NotFound('User not found');
    return data;
};

/**
 * 
 * @param id 
 * @returns 
 */
export const updateisAuthenticated = async (id: string | Types.ObjectId) => {
    const update = await userModal.findByIdAndUpdate(
        id, 
        { isAuthenticated: true },
        { new: true }
    )
    if(!update) throw Error('Internal Server Error');
    return true;
};

/**
 * this function finds a user by email
 * @param email  user email
 * @returns  user
 * @throws  BadRequest if user does not exist
 */
export const findUserByEmail = async (email: string) => {
    const user = await userModal.findOne({ email }); 
    if(!user) throw new createError.BadRequest('No user with this email');
    return user;
};