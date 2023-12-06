import express, { Application } from "express"
import cors from "cors"
import { dbconfig } from "./utils/dbconfig"
import { Mainapp } from "./Mainapp"
import dotenv from "dotenv"
dotenv.config()

const app: Application = express()
const Port: number = 5566;
app.use(express.json())
app.use(cors())
Mainapp(app)

app.listen(Port, () => {
    console.log("server is running")
    dbconfig()
    console.log(Port)
})