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

export {
	createTask,
	findTask
}