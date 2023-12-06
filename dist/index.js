"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbconfig_1 = require("./utils/dbconfig");
const Mainapp_1 = require("./Mainapp");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const Port = 5566;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
(0, Mainapp_1.Mainapp)(app);
app.listen(Port, () => {
    console.log("server is running");
    (0, dbconfig_1.dbconfig)();
    console.log(Port);
});
