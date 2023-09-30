import { User } from "../types"
import {EmailTaken, UserNotFound, AccountNotConfirmed, InvalidCredentials, InvalidToken} from "../errors"
import UserModel from '../models/User'
import generateID from "../utils/generateId"
import generateJWT from "../utils/jwt.handler"
import { confirmAccount, resetPassword } from "./EmailService"

const registerUser = async (user: User) => {
	const { email } = user
	const userExists = await UserModel.findOne({ email })

	if (userExists) {
		throw new EmailTaken()
	}

	const newUser = new UserModel(user)
	newUser.token = generateID()
	const userSaved = await newUser.save()

	confirmAccount(userSaved)

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
	
	if (!isPasswordValid) {
		throw new InvalidCredentials()
	}

	return {
		id: userExists.id,
		name: userExists.name,
		email: userExists.email,
		token: generateJWT(userExists.id)
	}

}

const confirmUserAccount = async (token: string) => {
	const user = await UserModel.findOne({ token })
	if (!user) {
		throw new InvalidToken()
	}

	user.confirmed_at = new Date()
	user.token = ''
	await user.save()
}

const sendEmailToResetPassword = async (email: string) => {
	const userExists = await UserModel.findOne({ email })
	if (!userExists) {
		throw new UserNotFound()
	}
	userExists.token = generateID()
	await userExists.save()
	resetPassword(userExists)
}

const validateTokenToResetPassword = async (token: string) => {
	const user = await UserModel.findOne({ token })
	if (!user) {
		throw new InvalidToken()
	}
	return user
}

const updatePassword = async (token:string, password: string) => { 
	const user = await validateTokenToResetPassword(token)
	user.password = password
	user.token = ''
	await user.save()
}

export {
	registerUser,
	authenticateUser,
	confirmUserAccount,
	sendEmailToResetPassword,
	validateTokenToResetPassword,
	updatePassword
}