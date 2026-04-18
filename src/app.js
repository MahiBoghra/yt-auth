import express from 'express';

import authRouter from './routes/auth.routes.js';


const app = express();

//this is  also a middlewares, but they are built-in middlewares of express, so we don't need to import them, we can just use them directly
app.use(express.json());




app.use("/api/auth", authRouter);


export default app;
