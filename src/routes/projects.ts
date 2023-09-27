import express from 'express'
import {
	getProjects,
	create,
	getProject,
	editProject,
	deleteProject,
	addCollaborator,
	removeCollaborator,
	getTasks
} from '../controllers/ProjectController'
import auth from '../middleware/auth'

const router = express.Router()

router.use(auth)
	.get('/', getProjects)
	.post('/', create)
	.get('/:id', getProject)
	.put('/:id', editProject)
	.delete('/:id', deleteProject)
	.post('/:id/collaborators', addCollaborator)
	.delete('/:id/remove-collaborator', removeCollaborator)
	.get('/:id/tasks', getTasks)

export default router