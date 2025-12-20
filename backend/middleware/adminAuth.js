import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const adminAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Login Again",
    });
  }
  const token = authHeader.split(" ")[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.email !== process.env.ADMIN_EMAIL) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized, Login Again",
    });
  }
  next();
});

export default adminAuth;
