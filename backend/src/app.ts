import mongoose from 'mongoose';
import express from 'express';
import UserRouter from './routes/UserRoutes';
import cors from 'cors';
import app from '.';

mongoose.connect('mongodb://localhost:27017/shareenergytest');


app.use(cors());
app.use(express.json());

app.use('/users', UserRouter);
app.get('/', (_req, res) => res.send('Hello there!'));
