import express from 'express';
import mongoose from 'mongoose';
import UserRouter from './routes/UserRoutes';
import cors from 'cors';


const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/myapp');

app.use(cors());
app.use(express.json());

app.use('/users', UserRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});