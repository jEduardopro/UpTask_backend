import { HttpStatusCode } from "../types";
import BaseError from "./BaseError"

export class InvalidToken extends BaseError {
	constructor(message: string = 'Invalid token') {
		super(message, HttpStatusCode.FORBIDDEN);
	}
}