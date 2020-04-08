import express from "express";
import routes from "../routes";
import { getLogin, postLogin, postJoin, getJoin, logout } from "../controllers/userController";
import { home, search } from "../controllers/videoController";

const globalRouter = express.Router();


globalRouter.get(routes.home, home);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

export default globalRouter;