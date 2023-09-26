import { HttpStatusCode } from "../types";
import BaseError from "./BaseError";

export class AccountNotConfirmed extends BaseError {
	constructor(message: string = 'Account not confirmed') {
		super(message, HttpStatusCode.FORBIDDEN);
	}
}