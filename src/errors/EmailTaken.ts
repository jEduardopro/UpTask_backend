import { HttpStatusCode } from "../types";
import BaseError from "./BaseError";

export class EmailTaken extends BaseError {
	constructor(message: string = 'Email is already taken') {
		super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);
	}
}