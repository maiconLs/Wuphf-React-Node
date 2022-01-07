import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())

app.use(express.static('public'))

app.use(cors({credentials: true, origin: 'http://localhost:3000'}))

app.listen(5000)