import { Request, Response } from "express"
import { registerUser } from "../services/UserService"
import { asyncHandler } from "../utils/async.handler"

const register = asyncHandler(async (req: Request, res: Response) => {
	const user = await registerUser(req.body)
	res.json(user)
})

export {
	register
}