import e, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ContextRunner } from "express-validator";


/**
 * this function validates request data
 * @param validations array of validation middlewares
 * @returns void
 * @throws BadRequest if validation fails
 */
export const validate = (validations: ContextRunner[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        for ( let validation of validations){
            const result = await validation.run(req);
            if(!result.isEmpty()){
                throw new createHttpError.BadRequest(result.array()[0].msg);
            }
        }
        next();
    }
}

export default validate;
