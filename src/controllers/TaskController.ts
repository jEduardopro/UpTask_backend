import { Response } from "express"
import { AuthReq } from "../types"
import {createTask, destroyTask, findTask, updateTask, updateTaskStatus} from '../services/TaskService'
import { asyncHandler } from "../utils/async.handler"

const create = asyncHandler(async (req: AuthReq, res: Response) => {
	const task = await createTask(req)
	res.json(task)
})

const getTask = asyncHandler(async (req: AuthReq, res: Response) => {
	const task = await findTask(req)
	res.json(task)
})

const update = asyncHandler(async (req: AuthReq, res: Response) => {
	const task = await updateTask(req)
	res.json(task)
})

const deleteTask = asyncHandler(async (req: AuthReq, res: Response) => {
	await destroyTask(req)
	res.json({ message: 'Task deleted' })
})

const changeStatus = asyncHandler(async (req: AuthReq, res: Response) => {
	const task = await updateTaskStatus(req)
	res.json(task)
})

export {
	create,
	getTask,
	update,
	deleteTask,
	changeStatus
}