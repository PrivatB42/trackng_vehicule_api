import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";

import router from './routes/Routes';

dotenv.config()


const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin:"http://localhost:3000",credentials:true}))
app.use('/api', router)

app.listen(process.env.APP_PORT, () => {
    console.log(`${process.env.APP_NAME} écoute sur le port ${process.env.APP_PORT}`)
})