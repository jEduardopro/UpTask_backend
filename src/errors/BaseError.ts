class BaseError extends Error {
	public readonly statusCode: number;

	constructor(message: string, statusCode: number) {
		super(message);
		Object.setPrototypeOf(this, new.target.prototype);

		this.statusCode = statusCode;

		Error.captureStackTrace(this);
	}
}

export default BaseError;