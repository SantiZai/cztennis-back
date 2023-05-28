import { Router } from 'express'
import * as clientsController from '../controllers/clientsController'

const cRouter = Router()

cRouter.get('/', clientsController.getClients)
cRouter.get('/:id', clientsController.getClient)
cRouter.post('/', clientsController.addClient)
cRouter.delete('/:id', clientsController.deleteClient)
cRouter.patch('/:id', clientsController.updateClient)

export default cRouter