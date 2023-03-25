import express from "express";
import dotenv from "dotenv";
import morgan from 'morgan'
import connectDB from './database/db.js'

// Routes
import userRoutes from './routes/userRoutes.js'
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(morgan('tiny'))
app.use(notFound)
app.use(errorHandler)


const api = process.env.BASE_API_URL 
const PORT = process.env.PORT || 5000;

app.use(`${api}/users`, userRoutes)


app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
