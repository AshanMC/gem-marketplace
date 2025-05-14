import User from "../model/User.js";

const isAdmin = async (req, res, next) => {
  try {
    if (!req.userAuthId) {
      return next(new Error("Not authenticated."));
    }

    const user = await User.findById(req.userAuthId);

    if (!user) {
      return next(new Error("User not found."));
    }

    if (user.isAdmin) {
      next(); // Allow access
    } else {
      return next(new Error("Access Denied, Admin Only!"));
    }
  } catch (error) {
    next(error);
  }
};

export default isAdmin;