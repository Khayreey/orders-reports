import express from 'express'
import { addProductsToWarehouse, deleteWareHouseProduct, getAllProductsFromWarehouse, updateWareHouse } from '../controllers/warehouseController'
const WarehouseRoute = express.Router()

WarehouseRoute.route('/').post(addProductsToWarehouse).get(getAllProductsFromWarehouse)
WarehouseRoute.route('/:id').patch(updateWareHouse).delete(deleteWareHouseProduct)
export default WarehouseRoute