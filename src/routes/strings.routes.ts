import { Router } from 'express'
import * as stringsController from '../controllers/stringsController'


const sRouter = Router()

sRouter.get('/', stringsController.getStrings)
sRouter.get('/:id', stringsController.getString)
sRouter.post('/', stringsController.addString)
sRouter.delete('/:id', stringsController.deleteString)
sRouter.patch('/:id', stringsController.updateString)

export default sRouter