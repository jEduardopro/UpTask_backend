import { Request, Response } from "express";
import { asyncHandler } from "../utils/async.handler";
import { getProjectList, createProject, findProject } from "../services/ProjectService";


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

})

const deleteProject = asyncHandler(async (req: Request, res: Response) => {

})

const addCollaborator = asyncHandler(async (req: Request, res: Response) => {

})

const removeCollaborator = asyncHandler(async (req: Request, res: Response) => {

})

const getTasks = asyncHandler(async (req: Request, res: Response) => {

})

export {
	getProjects,
	create,
	getProject,
	editProject,
	deleteProject,
	addCollaborator,
	removeCollaborator,
	getTasks
}

