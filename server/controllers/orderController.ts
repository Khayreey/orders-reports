/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import throwBadRequestError from "../errors/BadRequestError";
import OrderModel from "../models/orderModel";
import ProductModel from "../models/productModel";
// import { Types } from "mongoose";
import throwNotFoundError from "../errors/NotFoundError";

interface ProductInterface {
  product: string;
  quantity: number;
  type?: string;
}


export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { products, shipId, address, country , name , phone , price } = req.body;

    if (!products || products.length === 0) {
      throwBadRequestError("لابد من توافر المنتجات");
    }

    // Check if all products exist
    const productIds = products.map((e: ProductInterface) => e.product);
    const isProductsExist = await ProductModel.find({
      _id: { $in: productIds },
    });

    if (isProductsExist.length !== productIds.length) {
      throwBadRequestError("يوجد منتجات غير موجودة");
    }

    let isError = '';

    // Use Promise.all to handle async operations
    await Promise.all(
      products.map(async (e: ProductInterface) => {
        const product = await ProductModel.findOne({ _id: e.product });
        if (!product) {
          isError = `يوجد منتج غير متاح`;
        }
         else if (product.type.length !== 0) {
        
          if (!e.type) {
            isError = `لا بد من توافر النوع "${product.name}"`;
          } 
          else {
            const isTypeExist = await ProductModel.exists({  
              "type._id": e.type,
            });
            console.log(isTypeExist)
            if (!isTypeExist) {
              isError = `لا  النوع "${product.name}"`;
            }
          }
        }
        else {
          if(e.type) {
            isError = `${product.name} لا يحتوي علي انواع داخلية`;
          }
          console.log(e , product)
          if(product.quantity  - (e.quantity) < 0)
          {
            isError =  `الكمية المطلوبة ل ${product.name} غير متاحة متاح فقط ${product.quantity}`
          } 
        } 
      })
    );

    if (isError !== '') {
      throwBadRequestError(isError);
    }
   
    if (!name) throwBadRequestError('لابد من توافر اسم العميل')
    if (!phone) throwBadRequestError("لابد من توافر رقم العميل")
    if (!price) throwBadRequestError("لابد من توافر سعر الطلب")
    if (!country) throwBadRequestError("لابد من اختيار المحافظة / المركز");
    if (!address) throwBadRequestError("لابد من توافر العنوان التفصيلي");
    if (!shipId) throwBadRequestError("لابد من توافر مسئول الشحن");
    // all incoming data is right itis time to remove the quantity
   

    const data = { ...req.body, status: "معلق" };
    const newOrder = await OrderModel.create(data);

    let isErrorInQuantity = ''
    await Promise.all(
      products.map(async (e: ProductInterface) => {
        const product = await ProductModel.findOne({ _id: e.product });
         if(!product) {
          isErrorInQuantity = 'fdfdfdfdfd'
         }
         else {
          if(product?.type.length > 0) {
            await ProductModel.findOneAndUpdate(
              { _id: e.product, "type._id": e.type },
              {
                $inc: { "type.$.quantity": -e.quantity, quantity: -e.quantity },
              },
              { new: true, runValidators: true }
            );
          }
          else {
            await ProductModel.findOneAndUpdate(
              { _id: e.product },
              { 
                $inc: {  quantity: -e.quantity },
              },
              { new: true, runValidators: true }
            );
          }
         }
      
      })
    );
    console.log(isErrorInQuantity)
   

   
    res.status(201).json({ data: newOrder });
  } catch (error : any) {
    // Handle errors here, e.g., return a 400 response with the error message.
    res.status(400).json({ error: error.message });
  }
};


export const getAllOrders = async (req: Request, res: Response) => {
  console.log(req, res);
};

export const updateOrder = async (req: Request, res: Response) => {
  const {
    // user: { permissions },
    params: { id: orderId },
    body: {  product  , shipId},
  } = req;
  // const isHaveAuth = permissions.update.includes("ship");
  // if (!isHaveAuth || !permissions)
  //   throwForbiddnError("ليس لديك الصلاحية لتعديل مسئول شحن");
  if (!shipId && !product)
    throwBadRequestError("لابد من ادخال البيانات المراد تعديلها");
  const updatedOrder = await OrderModel.findOneAndUpdate(
    { _id: orderId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedOrder) throwNotFoundError("لا يوجدد مسئول شحن  لتعديله");
  res.status(200).json({ data: updatedOrder });
};
