import { connect } from "mongoose"
import dotenv from "dotenv"

dotenv.config()
const URL: string = "mongodb+srv://zionakwubo:zionakwubo@cluster0.3bx2yps.mongodb.net/authFlowDB?retryWrites=true&w=majority"

console.log(URL)
export const dbconfig = async () => {
    try {
        await connect(URL).then(() => {
            try {
                console.log("data base is active")
            } catch (error) {
                console.log(error)
            }

        })
    } catch (error) {
        return error
    }
}