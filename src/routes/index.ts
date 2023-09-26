import express from 'express'
import { readdirSync } from 'fs'

const ROUTER_PATH = `${__dirname}`
const router = express.Router()

const formatFilename = (filename: string) => {
	return filename.split('.').shift()
}

readdirSync(ROUTER_PATH).forEach((file) => {
	const filename = formatFilename(file)
	if (filename !== 'index') {
		import(`./${filename}`).then((moduleRouter) => {
			router.use(`/${filename}`, moduleRouter.default)
		})
	}
})

export default router