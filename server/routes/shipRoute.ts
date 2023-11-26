import express from 'express'
import { createNewShip, deleteShip, getAllShips, updateShip , getSingleShip} from '../controllers/shipController'

const ShipRoute = express.Router()

ShipRoute.route('/').post(createNewShip).get(getAllShips)

ShipRoute.route('/:id').patch(updateShip).delete(deleteShip).get(getSingleShip)

export default ShipRoute