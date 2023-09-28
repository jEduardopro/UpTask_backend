import express from 'express'
import {
	getProjects,
	create,
	getProject,
	editProject,
	deleteProject,
	addCollaborator,
	removeCollaborator
} from '../controllers/ProjectController'
import auth from '../middleware/auth'
import checkId from '../middleware/checkId'

const router = express.Router()

router.use(auth)
	.get('/', getProjects)
	.post('/', create)
	.get('/:id', checkId, getProject)
	.put('/:id', checkId, editProject)
	.delete('/:id', checkId, deleteProject)
	.post('/:id/collaborators', addCollaborator)
	.delete('/:id/remove-collaborator', removeCollaborator)

export default router