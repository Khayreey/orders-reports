// last and most important one 
import express from 'express'
import {getOrdersCount , updateOrdersByIds ,runOrders , createNewOrder, updateOrder , getAllPendingOrders, deleteOrder, updateOrderStatus, getAllRunningOrders, getOrderById, getAllOrdersWithFilter, getOrderByName, getOrderByPhone } from '../controllers/orderController'

const OrderRoute = express.Router()

OrderRoute.route('/').post(createNewOrder)
OrderRoute.route('/order/:id').patch(updateOrder).delete(deleteOrder).get(getOrderById)



OrderRoute.route('/order/phone/:phone').get(getOrderByPhone)
OrderRoute.route('/order/name/:name').get(getOrderByName)

OrderRoute.route('/run').post(runOrders)
OrderRoute.route('/pending').get(getAllPendingOrders)
OrderRoute.route('/running').get(getAllRunningOrders)

OrderRoute.route('/status/:id').patch(updateOrderStatus)
OrderRoute.route('/count').get(getOrdersCount) 

OrderRoute.route('/updateMany').post(updateOrdersByIds)

OrderRoute.route('/filter').get(getAllOrdersWithFilter)

export default OrderRoute