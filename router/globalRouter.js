import express from "express";
import passport from "passport";
import routes from "../routes";
import { getLogin, postLogin, postJoin, getJoin, logout, githubLogin, postGithubLogIn } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPublic } from "../middlewares";


const globalRouter = express.Router();


globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic ,getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);


globalRouter.get(routes.gitHub, githubLogin);

globalRouter.get(
    routes.githubCallback,
    passport.authenticate('github', { failureRedirect: "/login"}),
    postGithubLogIn
);

export default globalRouter;