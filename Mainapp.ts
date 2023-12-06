import { Application, NextFunction, Request, Response } from "express";
import { HTTP, mainError } from "./Mainerror";
import user from "./router/userRouter"
import ejs from "ejs"
export const Mainapp = (app: Application) => {
    try {
        app.use("/api/v1/", user)


        app.get("/view", (Req: Request, res: Response) => {
            try {

            } catch (error) {
                return res.status(404).json({ message: "error" })
            }
        })



        app.get("/", (req: Request, res: Response) => {
            try {
                return res.status(200).json({ message: "welcome to my api v1 page" })
            } catch (error) {
                return res.status(404).json({ message: "error" })
            }
        })


        app.all("*", (req: Request, res: Response, next: NextFunction) => {
            next(
                new mainError({
                    name: "Route error",
                    message: `This Route ${req.originalUrl} dosent exist`,
                    status: HTTP.BAD,
                    success: false,
                })
            )
        })

    } catch (error) {

    }
}