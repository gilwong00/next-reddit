import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT ?? 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

app.listen(PORT, () => console.log(`running on port ${PORT}`));
