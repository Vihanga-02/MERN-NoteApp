import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware 
app.use(cors(
  {
    origin:"http://localhost:5173", // Allow requests from this origin
  }
))
app.use(express.json()); // Parse JSON bodies
app.use(rateLimiter); // Apply rate limiting middleware


// our custom middleware to log requests
// app.use((req, res, next) => {
//   console.log("Request received:", req.method, req.url); 
//   next()
// });

app.use("/api/notes", notesRoutes);


connectDB().then(() => {
    app.listen(PORT, () => {
    console.log('Server is running on port:', PORT);
  });
});
