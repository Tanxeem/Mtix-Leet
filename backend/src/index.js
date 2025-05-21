import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import problemRoutes from './routes/problem.routes.js';

const app = express();
dotenv.config();

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Welcome to the Leetlabs');
});

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/problems', problemRoutes)
app.use("/api/v1/execute-code", executionRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});