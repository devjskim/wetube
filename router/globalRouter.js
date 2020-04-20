import express from "express";
import passport from "passport";
import routes from "../routes";
import { getLogin, postLogin, postJoin, getJoin, logout, githubLogin, postGithubLogIn, getMe, facebookLogin, postFacebookLogin } from "../controllers/userController";
import { home, search } from "../controllers/videoController";
import { onlyPublic } from "../middlewares";
import { prototype } from "passport-github";


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

globalRouter.get(routes.me, getMe);

globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(routes.facebookCallback, 
    passport.authenticate('facebook', {failureRedirect: "/login"}),
    postFacebookLogin
);

export default globalRouter;