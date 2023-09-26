import { Request } from 'express';
import { AuthUser } from './User';

export * from './User'

export interface AuthReq extends Request {
  user?: AuthUser;
}

export enum HttpStatusCode {
	OK = 200,
	BAD_REQUEST = 400,
	UNPROCESSABLE_ENTITY = 422,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER = 500
}