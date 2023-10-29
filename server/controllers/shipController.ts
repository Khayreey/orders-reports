import { Request, Response } from "express";
import throwForbiddnError from "../errors/ForbiddnError";
import ShipModel from "../models/shipModel";
import throwNotFoundError from "../errors/NotFoundError";
import throwBadRequestError from "../errors/BadRequestError";
export const createNewShip = async (req: Request, res: Response) => {
  const { name, phone } = req.body;
  // const { permissions } = req.user;
  // const isHaveAuth = permissions.create.includes("ship");
  // if (!isHaveAuth || !permissions)
    // throwForbiddnError("ليس لديك الصلاحية لاضافة مسئول شحن");
  if (!name) throwBadRequestError("لا بد من توافر اسم مسئول الشحن", "name");
  if (!phone)
    throwBadRequestError("لا بد من توافر  رقم هاتف مسئول الشحن", "phone");
  const newShip = await ShipModel.create({ name: name, phone: phone });
  res.status(201).json({ data: newShip });
};
export const getAllShips = async (req: Request, res: Response) => {
  const { permissions } = req.user;
  const isHaveAuth = permissions.view.includes("ship");
  if (!isHaveAuth) throwForbiddnError("ليس لديك الصلاحية لتصفح المنتجات");
  const allShips = await ShipModel.find({});
  res.status(200).json({ data: allShips });
};
export const updateShip = async (req: Request, res: Response) => {
  const {
    user: { permissions },
    params: { id: shipId },
    body: { name, phone },
  } = req;
  const isHaveAuth = permissions.update.includes("ship");
  if (!isHaveAuth || !permissions)
    throwForbiddnError("ليس لديك الصلاحية لتعديل مسئول شحن");
  if (!name && !phone)
    throwBadRequestError("لابد من ادخال البيانات المراد تعديلها");
  const updatedShip = await ShipModel.findOneAndUpdate(
    { _id: shipId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!updatedShip) throwNotFoundError("لا يوجدد مسئول شحن  لتعديله");
  res.status(200).json({ data: updatedShip });
};
export const deleteShip = async (req: Request, res: Response) => {
  const {
    user: { permissions },
    params: { id: shipId },
  } = req;
  const isHaveAuth = permissions?.delete?.includes("ship");
  if (!isHaveAuth) throwForbiddnError("ليس لديك الصلاحية لحذف مسئول شحن");
  const ship = await ShipModel.findOneAndRemove({
    _id: shipId,
  });
  if (!ship) throwNotFoundError("لا يوجدد مسئول شحن متوافق لحذفه");
  res.status(200).json({ data: ship });
};