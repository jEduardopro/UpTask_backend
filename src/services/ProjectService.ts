import ProjectModel from '../models/Project'
import { AuthReq } from "../types"
import { ProjectNotFound } from "../errors"
import { Types } from 'mongoose';
import {findUserByEmail} from './UserService'

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

const projectExist = async (req: AuthReq) => {
	const project = await ProjectModel.findById(req.params.id)

	if (!project) {
		throw new ProjectNotFound()
	}

	if (project.creator.toString() !== req.user.id) {
		throw new ProjectNotFound()
	}

	return project
}

const findProject = async (req: AuthReq) => {
	const project = await projectExist(req)
	await project.populate('tasks')
	await project.populate('collaborators', 'name email')
	return project
}

const updateProject = async (req: AuthReq) => {
	const project = await projectExist(req)

	project.name = req.body.name || project.name
	project.description = req.body.description || project.description
	project.deadline = req.body.deadline || project.deadline
	project.client = req.body.client || project.client

	await project.save()

	return project
}

const destroyProject = async (req: AuthReq) => {
	const project = await projectExist(req)
	await project.deleteOne()
}

const addCollaboratorToProject = async (req: AuthReq) => {
	const project = await projectExist(req)
	
	const { email } = req.body
	const user = await findUserByEmail(email)

	if (project.creator.toString() === user.id) {
		throw new Error('You cannot add yourself as a collaborator')
	}

	if (project.collaborators.includes(user.id)) {
		throw new Error('The user is already a collaborator')
	}
		
	project.collaborators.push(user.id)
	await project.save()
	
}

const deleteCollaboratorFromProject = async (req: AuthReq) => {
	const project = await projectExist(req)

	project.collaborators = project.collaborators.filter(collaborator => collaborator.toString() !== req.params.collaboratorId)
	await project.save()
}

export {
	getProjectList,
	createProject,
	findProject,
	updateProject,
	destroyProject,
	addCollaboratorToProject,
	deleteCollaboratorFromProject
}