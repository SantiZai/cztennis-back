import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import clientsRoutes from './routes/clients.routes'
import stringsRoutes from './routes/strings.routes'

const app = express()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/clients', clientsRoutes)
app.use('/api/strings', stringsRoutes)

app.use((req, res, next) => res.status(404).json({ message: 'Endpoint not found' }))

export default app