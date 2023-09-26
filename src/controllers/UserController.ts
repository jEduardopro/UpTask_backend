import { Request, Response } from "express"
import { authenticateUser, confirmUserAccount, registerUser, sendEmailToResetPassword } from "../services/UserService"
import { asyncHandler } from "../utils/async.handler"

const register = asyncHandler(async (req: Request, res: Response) => {
	const user = await registerUser(req.body)
	res.json(user)
})

const signIn = asyncHandler(async (req: Request, res: Response) => {
	const user = await authenticateUser(req.body)
	res.json(user)
})

const confirm = asyncHandler(async (req: Request, res: Response) => {
	const token = req.params.token
	await confirmUserAccount(token)
	res.json({
		message: 'Account confirmed successfully'
	})
})

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
	const { email } = req.body
	await sendEmailToResetPassword(email)
	res.json({
		message: 'Password reset email sent'
	})
})

export {
	register,
	signIn,
	confirm,
	forgotPassword
}