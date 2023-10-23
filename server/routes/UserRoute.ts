import express from 'express'
import { createNewUserHandler, loginHandler } from '../controllers/userController'

const UserRoute = express.Router()

UserRoute.route('/login').post(loginHandler)

UserRoute.route('/signup').post(createNewUserHandler)
export default UserRoute