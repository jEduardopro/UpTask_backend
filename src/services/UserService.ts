import { User } from "../types"
import UserModel from '../models/User'
import EmailTaken from "../errors/EmailTaken"
import generateID from "../utils/generateId"

const registerUser = async (user: User) => {
	const { email } = user
	const userExists = await UserModel.findOne({ email })

	if (userExists) {
		throw new EmailTaken()
	}

	const newUser = new UserModel(user)
	newUser.token = generateID()
	const userSaved = await newUser.save()

	return {
		name: userSaved.name,
		email: userSaved.email,
		confirmed_at: userSaved.confirmed_at,
		token: userSaved.token
	}
}

export {
	registerUser
}