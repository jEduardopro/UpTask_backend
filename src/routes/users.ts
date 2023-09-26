import express from 'express'
import { register, signIn } from '../controllers/UserController'

const router = express.Router()

router.post('/', register)
		.post('/login', signIn)

export default router