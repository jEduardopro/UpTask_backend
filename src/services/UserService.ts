import { User } from "../types"
import UserModel from '../models/User'
import EmailTaken from "../errors/EmailTaken"

const registerUser = async (user: User) => {
	const { email } = user
	const userExists = await UserModel.findOne({ email })

	if (userExists) {
		throw new EmailTaken()
	}

	const newUser = await new UserModel(user).save()
	return {
		name: newUser.name,
		email: newUser.email,
		confirmed_at: newUser.confirmed_at,
		token: newUser.token
	}
}

export {
	registerUser
}