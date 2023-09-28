import { Project } from "./Project";

export type Task = {
	name: string;
	description: string;
	status: boolean;
	deadline: Date;
	priority: TaskPriority;
	project: Project;
}

export enum TaskPriority {
	LOW = 'low',
	MEDIUM = 'medium',
	HIGH = 'high'
}