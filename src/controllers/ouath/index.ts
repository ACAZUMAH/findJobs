import { Request, Response } from "express"
import createError from 'http-errors';
import { jwtSign } from "src/common/helpers";
import { updateisAuthenticated } from "src/services/user";

export const googleAuth = async (req: Request, res: Response) => {
    const user: any = req.user;
    if(!user) throw new createError.Unauthorized("Invalid credentials");
    const authUser = await updateisAuthenticated(user.id, true);
    const token = jwtSign({ id: authUser._id });
    return res.json({ token: token });
};