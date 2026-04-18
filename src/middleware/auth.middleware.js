import jwt from "jsonwebtoken";
import config from "../config/config.js";
import userModel from "../models/user.model.js";

export async function authMiddleware(req, res, next) {
    try {
        // 1. Get token from header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Authorization token missing"
            });
        }

        const token = authHeader.split(" ")[1];

        // 2. Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, config.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                message: "Invalid or expired token"
            });
        }

        // 3. Find user from DB
        const user = await userModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // 4. Attach user to request
        req.user = user;

        // 5. Move to next
        next();

    } catch (err) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
}
