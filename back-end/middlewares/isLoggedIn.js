import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";
import User from "../model/User.js";

export const isLoggedIn = async (req, res, next) => {
  try {
    const token = getTokenFromHeader(req);
    const decoded = verifyToken(token);

    if (!decoded || decoded === "Token expired/invalid") {
      return next(new Error("Invalid or expired token, please login again"));
    }

    // Find user in DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    // Attach user to request
    req.userAuthId = user._id;
    req.user = user;

    next();
  } catch (err) {
    next(err);
  }
};