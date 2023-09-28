import ProjectModel from "../models/Project"
import Task from "../models/Task"
import { AuthReq, Project } from "../types"
import { ProjectNotFound, TaskNotFound } from "../errors"
import isValidId from "../utils/validateId"

const createTask = async (req: AuthReq) => {
	const { project } = req.body

	if (!isValidId(project)) {
		throw new ProjectNotFound()
	}

	const projectExist = await ProjectModel.findById(project)

	if (!projectExist) {
		throw new ProjectNotFound()
	}

	if (projectExist.creator.toString() !== req.user.id) {
		throw new ProjectNotFound()
	}

	const task = Task.create(req.body)
	return task
}

const findTask = async (req: AuthReq) => {
	const { id } = req.params
	const task = await Task.findById(id).populate<{ project: Project }>('project')
		
	if (!task) {
		throw new TaskNotFound()		
	}		
	
	if (task.project.creator.toString() !== req.user.id) {
		throw new ProjectNotFound()
	}

	return task
}

const updateTask = async (req: AuthReq) => {
	const task = await findTask(req)

	task.name = req.body.name || task.name
	task.description = req.body.description || task.description
	task.priority = req.body.priority || task.priority
	task.deadline = req.body.deadline || task.deadline

	await task.save()

	task.depopulate('project')

	return task
}

const destroyTask = async (req: AuthReq) => {
	const task = await findTask(req)
	await task.deleteOne()
}

export {
	createTask,
	findTask,
	updateTask,
	destroyTask
}