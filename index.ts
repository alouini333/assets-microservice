'use strict'
import express from 'express'
import cors from 'cors'
import { getDbClient } from './getDbClient'
import { errorMiddleware } from './src/middlewares/errorMiddleware';
import assetsRoutes from './src/routes/assetRoutes';

const PORT = 3001
const HOST = '0.0.0.0'

const client = getDbClient()

const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(cors());

app.get('/health', (req, res) => {
  res.json({ info: 'App is running!' })
})
app.use('/', assetsRoutes);

app.use(errorMiddleware);
app.listen(PORT, HOST, () => {
  console.log(`Connected to database "${client.database}"`)
})
