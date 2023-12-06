import { NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./Mainerror";



const viewError = (
    err: mainError,
    res: Response,
) => {
    try {
        return res.status(HTTP.BAD).json({
            name: err.name,
            message: err.message,
            status: err.status,
            success: err.success,
            err: err.stack
        })
    } catch (error) {
        return error
    }
}

export const errorHandler = (
    err: mainError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return viewError(err, res)
    } catch (error) {
        return error
    }
}