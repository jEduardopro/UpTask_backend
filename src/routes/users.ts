import express from 'express'
import { register, signIn, confirm, forgotPassword, validateToken, resetPassword} from '../controllers/UserController'

const router = express.Router()

router.post('/', register)
	.post('/login', signIn)
	.get('/confirm/:token', confirm)
	.post('/forgot-password', forgotPassword)
	.get('/forgot-password/:token', validateToken)
	.post('/reset-password/:token', resetPassword)

export default router