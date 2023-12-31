import express from 'express'
import {
	create,
	getTask,
	update,
	deleteTask,
	changeStatus
} from '../controllers/TaskController'
import auth from '../middleware/auth'
import checkId from '../middleware/checkId'

const router = express.Router()

router.post('/', auth, create)

router
	.route('/:id')
	.all(auth, checkId)
	.get(getTask)
	.put(update)
	.delete(deleteTask)

router.post('/:id/change-status', auth, changeStatus)

export default router