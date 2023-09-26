import { HttpStatusCode } from "../types";
import BaseError from "./BaseError";

export class InvalidCredentials extends BaseError {
	constructor(message: string = 'Invalid credentials') {
		super(message, HttpStatusCode.UNAUTHORIZED);
	}
}