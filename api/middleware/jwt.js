import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";

export const verifyToken = (req, res,next) => {
  const token = req.cookies.accessToken;
  // if (!token) return res.status(401).send("You are not authenticated!");
  if (!token) return next(createError(401, "You are not authenticated!"));

  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    // if (err) return res.status(403).send("You are not allowed to delete this user! token is not valid");
    if (err) return next(createError(403, "You are not allowed to delete this user! token is not valid"));
    req.userId = payload.id;
    req.isSeller = payload.isSeller;
    next();
  });
};
