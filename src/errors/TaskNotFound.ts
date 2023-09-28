import { HttpStatusCode } from "../types";
import BaseError from "./BaseError";

export class TaskNotFound extends BaseError {
	constructor(message: string = 'Task not found') {
		super(message, HttpStatusCode.NOT_FOUND);
	}
}