import express from 'express'
import { register, signIn, confirm } from '../controllers/UserController'

const router = express.Router()

router.post('/', register)
	.post('/login', signIn)
		.get('/confirm/:token', confirm)

export default router