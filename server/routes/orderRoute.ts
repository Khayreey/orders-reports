// last and most important one 
import express from 'express'
import { createNewOrder, getAllOrders, updateOrder } from '../controllers/orderController'

const OrderRoute = express.Router()

OrderRoute.route('/').post(createNewOrder).get(getAllOrders).patch(updateOrder)

export default OrderRoute