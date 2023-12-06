"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Mainapp = void 0;
const Mainerror_1 = require("./Mainerror");
const userRouter_1 = __importDefault(require("./router/userRouter"));
const Mainapp = (app) => {
    try {
        app.use("/api/v1/", userRouter_1.default);
        app.get("/view", (Req, res) => {
            try {
            }
            catch (error) {
                return res.status(404).json({ message: "error" });
            }
        });
        app.get("/", (req, res) => {
            try {
                return res.status(200).json({ message: "welcome to my api v1 page" });
            }
            catch (error) {
                return res.status(404).json({ message: "error" });
            }
        });
        app.all("*", (req, res, next) => {
            next(new Mainerror_1.mainError({
                name: "Route error",
                message: `This Route ${req.originalUrl} dosent exist`,
                status: Mainerror_1.HTTP.BAD,
                success: false,
            }));
        });
    }
    catch (error) {
    }
};
exports.Mainapp = Mainapp;
