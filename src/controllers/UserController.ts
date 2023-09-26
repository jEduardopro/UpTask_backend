import { Request, Response } from "express"
import { authenticateUser, registerUser } from "../services/UserService"
import { asyncHandler } from "../utils/async.handler"

const register = asyncHandler(async (req: Request, res: Response) => {
	const user = await registerUser(req.body)
	res.json(user)
})

const signIn = asyncHandler(async (req: Request, res: Response) => {
	const user = await authenticateUser(req.body)
})

export {
	register,
	signIn
}