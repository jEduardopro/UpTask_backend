import { HttpStatusCode } from "../types";
import BaseError from "./BaseError";

class EmailTaken extends BaseError {
	constructor(message: string = 'Email is already taken') {
		super(message, HttpStatusCode.UNPROCESSABLE_ENTITY);
	}
}

export default EmailTaken;