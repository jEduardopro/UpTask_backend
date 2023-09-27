import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true
	},
	description: {
		type: String,
		required: true,
		trim: true
	},
	deadline: {
		type: Date,
		default: Date.now()
	},
	client: {
		type: String,
		trim: true,
		required: true
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	collaborators: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
}, {
	versionKey: false,
	timestamps: true
})

export default mongoose.model('Project', ProjectSchema)