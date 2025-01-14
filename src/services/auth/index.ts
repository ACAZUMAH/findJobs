import { Types } from "mongoose";
import { authModal } from "../../models";
import { generateOTP, jwtSign } from "../../common/helpers";
import createError from "http-errors";
import { getUserById, updateisAuthenticated } from "../user";

export const createAuth = async (userId: Types.ObjectId, len: number ) => {
    let token = generateOTP(len);
    while( await authModal.exists({ token })){
        token = generateOTP(len);
    };
    const expiresIn = new Date(Date.now() + 1 * 60 * 60 * 1000);
    await authModal.findOneAndUpdate(
        { userId }, 
        { userId, token, expiresIn },
        { upsert: true }
    );
    return token;
};

export const verifyOtpAndCompleteAuth = async (token: string) =>{
    const auth = await authModal.findOneAndDelete({ token });

    if(!auth) throw createError.BadRequest('Invalid otp');

    if(new Date(auth.expiresIn) < new Date()) throw createError.BadRequest('Expired otp');

    const user = await updateisAuthenticated(auth.userId);
    
    const authToken = jwtSign({ id: user._id });

    return { user, token: authToken }
};