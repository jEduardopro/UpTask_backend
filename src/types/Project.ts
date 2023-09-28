import { User } from "./User";

export type Project = {
	name: string;
	description: string;
	deadline: Date;
	client: string;
	creator: User;
	collaborators: User[];
}