import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res,next) => {
  const user = await User.findById(req.params.id);

  if (req.userId !== user._id.toString()) {
    // return res.status(403).send("You are not authorized to delete this user!");
    return next(createError(403,"You are not authorized to delete this user"));
  }

  await User.findByIdAndDelete(req.params.id);
  return res.status(200).send("user deleted successfully!");
};

export const getUser = async (req, res,next) => {
  const user = await User.findById(req.params.id);
  return res.status(200).send(user);
};
