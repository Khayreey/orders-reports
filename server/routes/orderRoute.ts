// last and most important one 
import express from 'express'
import {getOrdersCount , runOrders , createNewOrder, getAllOrders, updateOrder , getAllPendingOrders, deleteOrder, updateOrderStatus, getAllRunningOrders } from '../controllers/orderController'

const OrderRoute = express.Router()

OrderRoute.route('/').post(createNewOrder).get(getAllOrders)
OrderRoute.route('/:id').patch(updateOrder).delete(deleteOrder)
OrderRoute.route('/run').post(runOrders)
OrderRoute.route('/pending').get(getAllPendingOrders)
OrderRoute.route('/running').get(getAllRunningOrders)

OrderRoute.route('/status/:id').patch(updateOrderStatus)
OrderRoute.route('/count').get(getOrdersCount) 

export default OrderRoute