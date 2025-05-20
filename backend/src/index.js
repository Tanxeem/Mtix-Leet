import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';

const app = express();
dotenv.config();

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Welcome to the Leetlabs');
});

app.use('/api/v1/auth', authRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});