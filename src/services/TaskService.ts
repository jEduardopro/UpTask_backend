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

	const task = await Task.create(req.body)
	projectExist.tasks.push(task._id)
	await projectExist.save()

	return task
}

const findTask = async (req: AuthReq) => {
	const { id } = req.params
	const task = await Task.findById(id).populate<{ project: Project }>('project')
		
	if (!task) {
		throw new TaskNotFound()		
	}		
	
	if (
		task.project.creator.toString() !== req.user.id &&
		!task.project.collaborators.some(coll => coll.toString() === req.user.id)
	) {
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
	const project = await ProjectModel.findById(task.project)
	project.tasks = project.tasks.filter(t => t.toString() !== task._id.toString())

	await Promise.allSettled([
		project.save(),
		task.deleteOne()
	])
}

const updateTaskStatus = async (req: AuthReq) => {
	const task = await findTask(req)
	task.status = !task.status
	await task.save()
	return task
}

export {
	createTask,
	findTask,
	updateTask,
	destroyTask,
	updateTaskStatus
}