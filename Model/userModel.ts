import { Document, Schema, model } from "mongoose";

interface iUser {
    email: string;
    password: string;
    verify: boolean,
    status: string;
    verifyToken: string
}
interface iuserData extends iUser, Document { }
const userModel = new Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    verify: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: "user"
    },
    verifyToken: {
        type: String
    },


})


export default model<iuserData>("user", userModel)