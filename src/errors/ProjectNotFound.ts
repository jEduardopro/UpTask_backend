import { HttpStatusCode } from "../types";
import BaseError from "./BaseError";

export class ProjectNotFound extends BaseError {
	constructor(message: string = 'Project not found') {
		super(message, HttpStatusCode.NOT_FOUND);
	}
}