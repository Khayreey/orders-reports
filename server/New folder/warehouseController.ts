import { Request, Response } from "express";
import throwForbiddnError from "../errors/ForbiddnError";
import WarehouseModel from "../models/warehouseModel";
import throwNotFoundError from "../errors/NotFoundError";
import ProductModel from "../models/productModel";
import throwBadRequestError from "../errors/BadRequestError";

export const getAllProductsFromWarehouse = async (
    req: Request,
    res: Response
  ) => {
    console.log(req, res);
    const { permissions } = req.user;
    const isHaveAuth = permissions.view.includes("warehouse");
    if (!isHaveAuth) throwForbiddnError("ليس لديك الصلاحية لتصفح المخزن");
    const allProducts = await WarehouseModel.find({});
    res.status(200).json({ data: allProducts });
  };

export const addProductsToWarehouse = async (req: Request, res: Response) => {
  const { productId, quantity } = req.body;
  const { permissions } = req.user;
  if(!productId) throwBadRequestError('لابد من اختيار المنتج' , 'product')
  if (!quantity) throwBadRequestError("لابد من ادخال كمية المنتج");
  const isHaveAuth = permissions.create.includes("warehouse");
  if (!isHaveAuth || !permissions)
    throwForbiddnError("ليس لديك الصلاحية لاضافة منتج في المخزن");
  const isProductExist = await ProductModel.exists({ _id: productId });
  if (!isProductExist) throwNotFoundError("هذا المنتج غير موجود");
  
 
  const isProductExistInWarehouse = await WarehouseModel.findOne({ product : productId });
  let newProductToWareHouse;
  if (isProductExistInWarehouse) {
    const newQuantity = isProductExistInWarehouse.quantity + +quantity;
    newProductToWareHouse = await WarehouseModel.findOneAndUpdate(
      { product: productId },
      { quantity: newQuantity },
      { new: true, runValidators: true }
    );
  } else {
    newProductToWareHouse = await WarehouseModel.create({
      product: productId,
      quantity: quantity,
    });
  }

  res.status(201).json({ data: newProductToWareHouse });
};




export const updateWareHouse = async (req : Request , res : Response)=>{
    const {  quantity } = req.body;
    const { id : productId} = req.params
    const { permissions } = req.user;
    if(!productId) throwBadRequestError('لابد من اختيار المنتج' , 'product')
    if (!quantity) throwBadRequestError("لابد من ادخال كمية المنتج");
    const isHaveAuth = permissions.update.includes("warehouse");
    if (!isHaveAuth || !permissions)
      throwForbiddnError("ليس لديك الصلاحية لاضافة منتج في المخزن");
    const isProductExist = await ProductModel.exists({ _id: productId });
    if (!isProductExist) throwNotFoundError("هذا المنتج غير موجود");
    
   
    const isProductExistInWarehouse = await WarehouseModel.findOne({ product : productId });
     if(!isProductExistInWarehouse) throwNotFoundError('هذا المنتج غير موجود في المخزن')
   
      
      const newProductToWareHouse = await WarehouseModel.findOneAndUpdate(
        { product: productId },
        { quantity: quantity },
        { new: true, runValidators: true }
      );
    res.status(200).json({data : newProductToWareHouse})
}

export const deleteWareHouseProduct = async (req : Request , res : Response) =>{
    const {
        user: { permissions },
        params: { id: productId },
      } = req;
      const isHaveAuth = permissions?.delete?.includes("warehouse");
      if (!isHaveAuth) throwForbiddnError("ليس لديك الصلاحية لحذف  ");
      const warehouseProduct = await WarehouseModel.findOneAndRemove({
        product: productId,
      });
      if (!warehouseProduct) throwNotFoundError("لا يوجدد مسئول شحن متوافق لحذفه");
      res.status(200).json({ data: warehouseProduct });
}