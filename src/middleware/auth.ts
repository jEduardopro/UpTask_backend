import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import User from "../models/User";
import { AuthReq, HttpStatusCode } from "../types";

const auth = async (req: AuthReq, res: Response, next: NextFunction) => {
	const authorization = req.headers.authorization
	if (!authorization || !authorization.startsWith('Bearer')) {		
		return res.status(HttpStatusCode.UNAUTHORIZED).json({
			message: 'Unauthorized'
		})
	}

	const token = authorization.split(' ')[1]

	if (!token) {
		return res.status(HttpStatusCode.UNAUTHORIZED).json({
			message: 'Unauthorized'
		})
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET)
	if (typeof decoded === 'string') {
		console.log('decoded is string');
		return res.status(HttpStatusCode.UNAUTHORIZED).json({
			message: 'Unauthorized'
		})
	}

	const user = await User.findById(decoded.id).select("-password -confirmed_at -token -updatedAt -createdAt")
	if (!user) {
		return res.status(HttpStatusCode.UNAUTHORIZED).json({
			message: 'Unauthorized'
		})
	}
	req.user = { id: user.id, name: user.name, email: user.email}	
	next()
}

export default auth