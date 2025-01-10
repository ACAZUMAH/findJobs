import createHttpError from "http-errors";
import { NextFunction, Request, Response } from "express";

/**
 * catch all errors and return a response with custom error message
 * @param err error object
 * @param _req Request
 * @param _res Response
 * @param next NextFunction
 * @returns response with error message
 */
const errorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
    console.error(err)
    if (err instanceof createHttpError.HttpError) {
        return res.status(err.statusCode).json({ errors: [{ message: err.message }] });
    }
    return res.status(500).json({ errors: [{ message: 'Internal Server Error' }] });
};

export default errorHandler;