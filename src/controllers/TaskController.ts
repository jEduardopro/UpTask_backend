import { Response } from "express"
import { AuthReq } from "../types"
import {createTask, findTask} from '../services/TaskService'
import { asyncHandler } from "../utils/async.handler"

const create = asyncHandler(async (req: AuthReq, res: Response) => {
	const task = await createTask(req)
	res.status(201).json({ task })
})

const getTask = asyncHandler(async (req: AuthReq, res: Response) => {
	const task = await findTask(req)
	res.json(task)
})

const updateTask = asyncHandler(async (req: AuthReq, res: Response) => {

})

const deleteTask = asyncHandler(async (req: AuthReq, res: Response) => {

})

const changeStatus = asyncHandler(async (req: AuthReq, res: Response) => {

})

export {
	create,
	getTask,
	updateTask,
	deleteTask,
	changeStatus
}