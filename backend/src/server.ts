import express, { response } from 'express'
import 'express-async-errors'
import routes from './routes'
import path from 'path'
import cors from 'cors'

import errorHandler from './errors/handler'

import './database/connection';

const app = express();
app.use(cors());
app.use(express.json())
app.use(routes)
app.use('/upload', express.static(path.join(__dirname, '..', 'upload')))
app.use(errorHandler)

app.listen(3333)