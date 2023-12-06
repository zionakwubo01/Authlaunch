import { Router } from "express";
import { Createuser, Loginuser, Verifyuser } from "../controller/userController";

const router: Router = Router()

router.route("/create-user").post(Createuser)
router.route("/verify-user").patch(Verifyuser)
router.route("/login-user").post(Loginuser)

export default router;