import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import cors from 'cors'
import {Server} from 'socket.io'
import http from 'http'
import connectDB from './config/db'
import routes from './routes'
import socket from './socket'

const PORT = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.use(cors())

const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: '*',
	},
})

const main = async () => {
	try {
		await connectDB()

		app.use('/api', routes)

		app.use((error: any, req: Request, res: Response, next: NextFunction) => {
			res.status(error.statusCode || 500).json({
				message: error.message,
			})
			next(error)
		})

		server.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))

		io.on('connection', socket)

	} catch (error) {
		console.log('Server Error: ', error);
	}
}

main()
