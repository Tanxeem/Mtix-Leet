import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import problemRoutes from './routes/problem.routes.js';
import executionRoute from './routes/executeCode.routes.js';
import submissionRoutes from './routes/submission.routes.js';
import playlistRoutes from './routes/playlist.routes.js';

const app = express();
dotenv.config();

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send('Welcome to the Leetlabs');
});

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/problems', problemRoutes)
app.use("/api/v1/execute-code", executionRoute);
app.use("/api/v1/submission", submissionRoutes);

app.use("/api/v1/playlist", playlistRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});