import { Request, Response } from "express";
import { asyncHandler } from "../utils/async.handler";
import { getProjectList, createProject, findProject, updateProject, destroyProject, addCollaboratorToProject, deleteCollaboratorFromProject } from "../services/ProjectService";
import {findUserByEmail} from '../services/UserService'

const getProjects = asyncHandler(async (req: Request, res: Response) => {
	const projects = await getProjectList(req)
	res.json(projects)
})

const create = asyncHandler(async (req: Request, res: Response) => {
	const project = await createProject(req)
	res.json(project)
})

const getProject = asyncHandler(async (req: Request, res: Response) => {
	const project = await findProject(req)
	res.json(project)
})

const editProject = asyncHandler(async (req: Request, res: Response) => {
	const project = await updateProject(req)
	res.json(project)
})

const deleteProject = asyncHandler(async (req: Request, res: Response) => {
	await destroyProject(req)
	res.json({
		message: 'Project deleted'
	})
})

const searchCollaborator = asyncHandler(async (req: Request, res: Response) => {
	const {email} = req.body
	const user = await findUserByEmail(email)
	res.json(user)
})

const addCollaborator = asyncHandler(async (req: Request, res: Response) => {
	await addCollaboratorToProject(req)
	res.json({
		message: 'Collaborator added successfully'
	})
})

const removeCollaborator = asyncHandler(async (req: Request, res: Response) => {
	await deleteCollaboratorFromProject(req)
	res.json({
		message: 'Collaborator removed successfully'
	})
})

export {
	getProjects,
	create,
	getProject,
	editProject,
	deleteProject,
	searchCollaborator,
	addCollaborator,
	removeCollaborator
}

