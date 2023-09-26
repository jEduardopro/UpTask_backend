import express, { NextFunction, Request, Response } from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './config/db'
import routes from './routes'

const PORT = process.env.PORT || 4000
const app = express()
app.use(express.json())
app.use(cors())

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

		app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`))

	} catch (error) {
		console.log('Server Error: ', error);
	}
}

main()
