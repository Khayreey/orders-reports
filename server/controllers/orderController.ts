/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import throwBadRequestError from "../errors/BadRequestError";
import OrderModel from "../models/orderModel";
import ProductModel from "../models/productModel";
import { Types } from "mongoose";

interface ProductInterface {
  product: string;
  quantity: number;
  type?: string;
}


export const createNewOrder = async (req: Request, res: Response) => {
  try {
    const { products, shipId, address, country } = req.body;

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
        } else if (product.type.length !== 0) {
          if (!e.type) {
            isError = `لا بد من توافر النوع "${product.name}"`;
          } else {
            const isTypeExist = await ProductModel.exists({
              _id: e.product,
              "type._id": e.type,
            });

            if (!isTypeExist) {
              isError = `لا  النوع "${product.name}"`;
            }
          }
        }
      })
    );

    if (isError !== '') {
      throwBadRequestError(isError);
    }

    if (!country) throwBadRequestError("لابد من اختيار المحافظة / المركز");
    if (!address) throwBadRequestError("لابد من توافر العنوان التفصيلي");
    if (!shipId) throwBadRequestError("لابد من توافر مسئول الشحن");

    const data = { ...req.body, status: "معلق" };
    const newOrder = await OrderModel.create(data);
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
  console.log(req, res);
};
