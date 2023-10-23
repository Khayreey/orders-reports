import {Request , Response} from 'express'

export const createNewOrder = async(req : Request , res : Response) =>{
    console.log(req , res)
}

export const getAllOrders = async (req:Request , res : Response) =>{
    console.log(req , res)
}

export const updateOrder = async (req:Request , res : Response) =>{
    console.log(req , res)
}