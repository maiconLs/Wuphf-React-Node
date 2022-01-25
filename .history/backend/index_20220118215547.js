import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(express.static('public'))

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

import UserRoutes from './routes/UserRoutes.js';

app.use('/users', UserRoutes)

app. listen(5000)