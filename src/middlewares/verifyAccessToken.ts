import { NextFunction, Request, Response } from 'express';
import { jwtVerify } from '../common/helpers/index';
import { getUserById } from '../services/user/index';
import { userDocument } from '@/common/Interfaces';

export const verifyAcessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerHeader = req.header['authorization'];

        if(!bearerHeader) return next();

        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer.length > 1 ? bearer[1] : bearer[0];

        if(!bearerToken) return next();

        const data = jwtVerify(bearerToken);

        if(!data?.id) return next();

        const user: userDocument = await getUserById(data.id);

        req.user = user;

    } catch (err) {
        console.error(err);
        process.exit(1);
    };
};