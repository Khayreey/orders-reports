import mongoose from "mongoose";

const warehouseSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "you must provide product"],
  },
  quantity: {
    type: Number,
    required: [true, "You Must Provide Contact Phone"],
    minLength: 1,
  },
});
const WarehouseModel = mongoose.model("Warehouse", warehouseSchema);
export default WarehouseModel;
