import { AuthReq } from "../types"
import ProjectModel from '../models/Project'
import { Types } from 'mongoose'
import { ProjectNotFound } from "../errors/ProjectNotFound"

const getProjectList = async (req: AuthReq) => {
	const projects = await ProjectModel.find().where('creator').equals(req.user.id)
	return projects
}

const createProject = async (req: AuthReq) => {
	const project = new ProjectModel(req.body)
	project.creator = new Types.ObjectId(req.user.id)
	await project.save()
	return project
}

const findProject = async (req: AuthReq) => {
	const project = await ProjectModel.findById(req.params.id)

	if (!project) {
		throw new ProjectNotFound()
	}

	if (project.creator.toString() !== req.user.id) {
		throw new ProjectNotFound()
	}

	return project
}

export {
	getProjectList,
	createProject,
	findProject
}