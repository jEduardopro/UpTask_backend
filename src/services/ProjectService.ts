import { AuthReq } from "../types"
import ProjectModel from '../models/Project'
import { Types } from 'mongoose'

const createProject = async (req: AuthReq) => {
	const project = new ProjectModel(req.body)
	project.creator = new Types.ObjectId(req.user.id)
	await project.save()
	return project
}


export {
	createProject
}