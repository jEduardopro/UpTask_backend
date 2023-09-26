import { HttpStatusCode } from "../types";
import BaseError from "./BaseError";

export class UserNotFound extends BaseError {
	constructor(message: string = 'User not found') {
		super(message, HttpStatusCode.NOT_FOUND);
	}
}