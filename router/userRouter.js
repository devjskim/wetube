import express from "express";
import routes from "../routes";
import { user, userDetail, getEditProfile, getChangePassword, postEditProfile, postChangePassword } from "../controllers/userController";
import { onlyPrivate, uploadAvatar } from "../middlewares";

const userRouter = express.Router();

//userRouter.get(routes.users, user);
userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, getChangePassword);
userRouter.post(routes.changePassword, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;