import { Router } from "express";
import {
  loginUser,
  registeruser,
  listUsers,
  removeUser,
  profileInfo,
  updateProfile,
} from "../Controllers/userController.mjs";
import authMiddleware from "../Middleware/authMiddleware.mjs";

const userRouter = Router();

// register user / create user
userRouter.post("/register", registeruser);
// login
userRouter.post("/login", loginUser);
// get list of users
userRouter.get("/list", listUsers);
// remove user - delete
userRouter.post("/remove", removeUser);
// get user profile
userRouter.get("/settings", authMiddleware, profileInfo);
// update profile info
userRouter.put("/update", authMiddleware, updateProfile);

export default userRouter;
