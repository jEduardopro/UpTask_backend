import express from 'express'
import { register, signIn, confirm, forgotPassword, validateToken, resetPassword, profile} from '../controllers/UserController'
import auth from '../middleware/auth'

const router = express.Router()

router.post('/', register)
	.post('/login', signIn)
	.get('/confirm/:token', confirm)
	.post('/forgot-password', forgotPassword)
	.get('/forgot-password/:token', validateToken)
	.post('/reset-password/:token', resetPassword)

router.get('/profile', auth, profile)

export default router