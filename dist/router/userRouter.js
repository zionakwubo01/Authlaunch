"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.route("/create-user").post(userController_1.Createuser);
router.route("/verify-user").patch(userController_1.Verifyuser);
router.route("/login-user").post(userController_1.Loginuser);
exports.default = router;
