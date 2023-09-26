import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { IUserDoc } from '../types'

const UserSchema: Schema<IUserDoc> = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		trim: true
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	token: {
		type: String,		
	},
	confirmed_at: {
		type: Date,
		default: null
	}
}, {
	timestamps: true
})

UserSchema.pre('save', async function (next) {

	if (!this.isModified('password')) {
		next()
	}

	const salt = await bcrypt.genSalt(10)
	this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.checkPassword = async function (password: string) {
	return await bcrypt.compare(password, this.password)
}

export default mongoose.model<IUserDoc>('User', UserSchema)