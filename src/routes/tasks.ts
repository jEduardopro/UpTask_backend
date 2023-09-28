import express from 'express'
import {
	createTask,
	getTask,
	updateTask,
	deleteTask,
	changeStatus
} from '../controllers/TaskController'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/', auth, createTask)

router.use(auth).route('/:id')
	.get(getTask)
	.put(updateTask)
	.delete(deleteTask)

router.post('/:id/change-status', auth, changeStatus)

export default router