import { User } from '../types'
import mail from '../config/mail'
import { readFileSync } from 'fs'
import { join } from 'path'

const confirmAccount = async (user: User) => {

	const { name, email, token } = user
	
	const htmlTemplate = readFileSync(join(__dirname, '../emails/confirm-account.html'), 'utf8')
	const variablesToReplace = [
		{name: '[name]', value: name},
		{name: '[url]', value: `${process.env.FRONTEND_URL}/confirm-account/${token}`}
	]

	let html = htmlTemplate

	variablesToReplace.forEach(variable => {
		html = html.replace(variable.name, variable.value)
	})	

	await mail.sendMail({
		from: '"UpTask - Manager of Projects" <no-reply@uptask.com>',
		to: email,
		subject: 'UpTask - Confirm your account',
		text: 'Confirm your account in UpTask',
		html: html
	})
}

export {
	confirmAccount
}