import { userModel } from '../../models';
import createError from 'http-errors';
import { Types } from 'mongoose';
import { GoogleUser, createUserInput, updateUserInput } from '../../common/Interfaces';
import { validateCreateUserData, validateUpdateUserData } from './validators';

/**
 * 
 * @param data 
 * @returns 
 */
export const createGoogleUser = async (data: GoogleUser) => {
    const user = await userModel.create({ ...data });
    return user;
};

/**
 * this function creates a new user and returns the created user
 * @param data - user information
 * @returns  created user
 * @throws  InternalServerError if user creation fails
 */
export const createUser = async (data: createUserInput) => {
    validateCreateUserData(data);
    const user = await userModel.create({ ...data });
    if(!user) throw new createError.InternalServerError('User creation failed');
    return user;
};

/**
 * this function checks if a user exists in the database during registration
 * @param email - user email
 * @throws  BadRequest if user exists
 */
export const checkUserExists = async (email?: string, phone?: string) => {
    const user = await userModel.findOne({ $or: [{ email, phone }]  })
    if(user) throw new createError.BadRequest('User already exists');
};

/**
 * get user by id
 * @param id - user's id
 * @returns found user
 */
export const getUserById = async (id: string | Types.ObjectId) => {
    if(!Types.ObjectId.isValid(id))  throw new createError.BadRequest('Invalid user id');
    const data = await userModel.findById(id, { __v: 0 });
    if(!data) throw new createError.NotFound('User not found');
    return data;
};

/**
 * update isAuthenticated after signup
 * @param id - user's id
 * @returns updated user
 */
export const updateisAuthenticated = async (id: string | Types.ObjectId, opt: boolean) => {
    const update = await userModel.findByIdAndUpdate(
        id, 
        { isAuthenticated: opt },
        { new: true }
    )
    if(!update) throw Error('Internal Server Error');
    return update;
};

/**
 * this function finds a user by email
 * @param email - user email
 * @returns  user
 * @throws  BadRequest if user does not exist
 */
export const findUserByEmail = async (email?: string | null) => {
    const query = {
        ...(email && { email })
    };

    const user = await userModel.findOne(query); 
    //if(!user) throw new createError.BadRequest('No user with this email');
    return user;
};

/**
 * get user by phone number
 * @param phone - phone number
 * @returns found user
 */
export const getUserByPhone = async (phone: string) => {
    const user = await userModel.findOne({ phone });
    if (!user) throw new createError.BadRequest("No user with this phone number");
    return user;
};

/**
 * find user by id and update
 * @param data - user's info
 * @returns updated user
 */
export const getUserByIdAndUpdate = async (data: updateUserInput) => {
    if(!Types.ObjectId.isValid(data.id)) throw new createError.BadRequest('Invalid user Id');
    validateUpdateUserData(data);
    const update = await userModel.findByIdAndUpdate({_id: data.id}, { ...data });
    if(!update) throw new createError.NotFound('Unable to update user');
    return update;
};