import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({ success: false, message: "Not Authorized Login Again" });
  }
  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = token_decode.id
  next();
});

export default authUser;