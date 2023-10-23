import express from 'express'
import { createNewShip, deleteShip, getAllShips, updateShip } from '../controllers/shipController'

const ShipRoute = express.Router()

ShipRoute.route('/').post(createNewShip).get(getAllShips)

ShipRoute.route('/:id').patch(updateShip).delete(deleteShip)

export default ShipRoute