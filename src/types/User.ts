import { Document } from "mongoose";

export type User = {
	name: string;
	email: string;
	password?: string;
	token?: string;
	confirmed_at?: Date;
}

export type AuthUser = User & {
	id: string;
}

export interface IUserDoc extends User, Document {
	checkPassword: (password: string) => Promise<boolean>
}