import express from 'express'
import { register, signIn, confirm, forgotPassword } from '../controllers/UserController'

const router = express.Router()

router.post('/', register)
	.post('/login', signIn)
	.get('/confirm/:token', confirm)
	.post('/forgot-password', forgotPassword)

export default router