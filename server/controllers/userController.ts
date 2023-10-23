import { Response, Request } from 'express';
import throwAuthError from "../errors/AuthError"
import throwNotFoundError from "../errors/NotFoundError"
import UserModel from "../models/userModel"
import throwBadRequestError from '../errors/BadRequestError';

export const loginHandler =  async (req : Request,res : Response)=>{
    const {email , password } = req.body
    if(!email) throwBadRequestError('لابد من ادخال البريد الالكتروني' , 'email')
    if(!password) throwBadRequestError('لابد من ادخال رمز الدخول' , 'password')
    const user = await UserModel.findOne({email : email})
    if(!user) {
        throwNotFoundError('هذا البريد غير موجود ارجع للمسئول' , "email")
    } 
    else {
        const isMatch = await user.isPasswordMatch(password)
        if(!isMatch) throwAuthError('كلمة مرور خاطئة' , "password")
        const token = user.createJWT()
        res.status(200).json({user , token})
    }
}

export const createNewUserHandler =  async (req : Request, res : Response)=>{
    const {email   , password , roleName , permissions} = req.body
    const user = await UserModel.create({email , password , roleName , permissions}) 
    const token = user.createJWT()
    res.status(201).json({user , token})  
} 