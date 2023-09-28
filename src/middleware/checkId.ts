import { NextFunction, Request, Response } from "express";
import isValidId from "../utils/validateId";

const checkId = async (req: Request, res: Response, next: NextFunction) => {

	const { id } = req.params	

	if (!isValidId(id)) {
		return res.status(404).json({
			message: 'Resource not found'
		})
	}

	next()
}

export default checkId