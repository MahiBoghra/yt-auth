import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const authRouter = Router();



/**
 * POST /api/auth/register
 */
authRouter.post("/register", authController.register)


/**
 * POST /api/auth/login
 */
authRouter.post("/login", authController.login)



/**
 * GET /api/auth/get-me
 */
authRouter.get("/get-me", authMiddleware, authController.getMe);



export default authRouter;