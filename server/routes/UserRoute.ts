import express from "express";
import {
  createNewUserHandler,
  loginHandler,
} from "../controllers/userController";
import authMiddelware from "../middleware/authMiddleware";

const UserRoute = express.Router();

UserRoute.route("/login").post(loginHandler);

//UserRoute.route("/signup").post(createNewUserHandler);
UserRoute.route("/signup").post(authMiddelware, createNewUserHandler);
export default UserRoute;
