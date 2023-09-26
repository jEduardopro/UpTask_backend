import { User } from "../types"
import {EmailTaken, UserNotFound, AccountNotConfirmed, InvalidCredentials} from "../errors"
import UserModel from '../models/User'
import generateID from "../utils/generateId"
import generateJWT from "../utils/jwt.handler"

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

const authenticateUser = async (user: User) => {
	const userExists = await UserModel.findOne({ email: user.email })
	if (!userExists) {
		throw new UserNotFound()
	}

	if (!userExists.confirmed_at) {
		throw new AccountNotConfirmed()
	}

	const isPasswordValid = await userExists.checkPassword(user.password)
	console.log('isPasswordValid', isPasswordValid);
	
	if (!isPasswordValid) {
		throw new InvalidCredentials()
	}

	return {
		name: userExists.name,
		email: userExists.email,
		confirmed_at: userExists.confirmed_at,
		token: generateJWT(userExists.id)
	}

}

export {
	registerUser,
	authenticateUser
}