import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		select: false,
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

export default mongoose.model('User', UserSchema)