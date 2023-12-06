import { Request, Response } from "express"
import { HTTP, mainError } from "../Mainerror"
import bcrypt from "bcrypt"
import crypto from "crypto"
import userModel from "../Model/userModel"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const Createuser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {

        const { email, password } = req.body

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt)

        const token = crypto.randomBytes(5).toString("hex")

        const User = await userModel.create({
            email,
            password: hash,
            verifyToken: token
        })
        return res.status(HTTP.OK).json({
            message: "created",
            data: User
        })

    } catch (error: any) {
        return res.status(HTTP.BAD).json({
            message: error.message,
            data: new mainError({
                name: "create user",
                success: false,
                message: "",
                status: HTTP.BAD
            })
        })

    }
}
export const Verifyuser = async (
    req: Request,
    res: Response
): Promise<Response> => {
    try {

        const { email, token } = req.body

        const Emailcheck = await userModel.findOne({ email })

        const GetToken = await userModel.findOne({ verifyToken: token })

        if (Emailcheck && GetToken) {

            await userModel.findByIdAndUpdate(
                Emailcheck._id,
                { verify: true, verifyToken: "" },
                { new: true }
            )

            return res.status(HTTP.OK).json({
                message: "user verified you can login"
            })
        } else {
            return res.status(HTTP.BAD).json({
                message: "checl yout inputd"
            })
        }



    } catch (error) {
        return res.status(HTTP.BAD).json({
            message: "error",
            data: new mainError({
                name: "create user",
                success: false,
                message: "",
                status: HTTP.BAD
            })
        })

    }
}
export const Loginuser = async (
    req: Request,
    res: Response
) => {
    try {

        const { email, password } = req.body

        const userEmail = await userModel.findOne({ email })
        if (userEmail) {
            const checkpassword = await bcrypt.compare(password, userEmail.password)

            if (checkpassword) {
                if (userEmail.verify && userEmail.verifyToken === "") {
                    const webToken = jwt.sign({ id: userEmail._id, status: userEmail.status },
                        "justasecret",
                        { expiresIn: "2D" }
                    );

                    return res.status(HTTP.OK).json({
                        messsage: "loggeed in",
                        data: webToken
                    })
                }
            }
        } else {
            return res.status(HTTP.BAD).json({ message: "email not found" })
        }




    } catch (error: any) {
        return res.status(HTTP.BAD).json({
            message: error.message,
            data: new mainError({
                name: "create user",
                success: false,
                message: "",
                status: HTTP.BAD
            })
        })

    }
}