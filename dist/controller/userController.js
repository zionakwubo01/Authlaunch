"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loginuser = exports.Verifyuser = exports.Createuser = void 0;
const Mainerror_1 = require("../Mainerror");
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const userModel_1 = __importDefault(require("../Model/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Createuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hash = yield bcrypt_1.default.hash(password, salt);
        const token = crypto_1.default.randomBytes(5).toString("hex");
        const User = yield userModel_1.default.create({
            email,
            password: hash,
            verifyToken: token
        });
        return res.status(Mainerror_1.HTTP.OK).json({
            message: "created",
            data: User
        });
    }
    catch (error) {
        return res.status(Mainerror_1.HTTP.BAD).json({
            message: error.message,
            data: new Mainerror_1.mainError({
                name: "create user",
                success: false,
                message: "",
                status: Mainerror_1.HTTP.BAD
            })
        });
    }
});
exports.Createuser = Createuser;
const Verifyuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, token } = req.body;
        const Emailcheck = yield userModel_1.default.findOne({ email });
        const GetToken = yield userModel_1.default.findOne({ verifyToken: token });
        if (Emailcheck && GetToken) {
            yield userModel_1.default.findByIdAndUpdate(Emailcheck._id, { verify: true, verifyToken: "" }, { new: true });
            return res.status(Mainerror_1.HTTP.OK).json({
                message: "user verified you can login"
            });
        }
        else {
            return res.status(Mainerror_1.HTTP.BAD).json({
                message: "checl yout inputd"
            });
        }
    }
    catch (error) {
        return res.status(Mainerror_1.HTTP.BAD).json({
            message: "error",
            data: new Mainerror_1.mainError({
                name: "create user",
                success: false,
                message: "",
                status: Mainerror_1.HTTP.BAD
            })
        });
    }
});
exports.Verifyuser = Verifyuser;
const Loginuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userEmail = yield userModel_1.default.findOne({ email });
        if (userEmail) {
            const checkpassword = yield bcrypt_1.default.compare(password, userEmail.password);
            if (checkpassword) {
                if (userEmail.verify && userEmail.verifyToken === "") {
                    const webToken = jsonwebtoken_1.default.sign({ id: userEmail._id, status: userEmail.status }, "justasecret", { expiresIn: "2D" });
                    return res.status(Mainerror_1.HTTP.OK).json({
                        messsage: "loggeed in",
                        data: webToken
                    });
                }
            }
        }
        else {
            return res.status(Mainerror_1.HTTP.BAD).json({ message: "email not found" });
        }
    }
    catch (error) {
        return res.status(Mainerror_1.HTTP.BAD).json({
            message: error.message,
            data: new Mainerror_1.mainError({
                name: "create user",
                success: false,
                message: "",
                status: Mainerror_1.HTTP.BAD
            })
        });
    }
});
exports.Loginuser = Loginuser;
