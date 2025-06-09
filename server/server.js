import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoutes.js';
import pricingRouter from './routes/pricingRoute.js';
import homeRouter from './routes/homeRoute.js';
import subscriptionRoutes from './routes/subscriptionRoute.js';

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB and Cloudinary
connectDB();
connectCloudinary();

// Set up CORS
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:5173',
    'https://positivus-fullstack.vercel.app',
    'https://positivus-fullstack-vishnu-js-projects.vercel.app', // Frontend link
    'https://positivus-fullstack-rm2w.vercel.app',// ✅ Correct Vercel admin URL
    'https://positivus-fullstack-jlcemmj8g-vishnu-js-projects.vercel.app', 
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/api/user', userRouter);
app.use('/api/pricing', pricingRouter);
app.use('/api/home', homeRouter);
app.use('/api/subscription', subscriptionRoutes);

app.get('/', (req, res) => res.send('API Working'));

app.listen(port, () => console.log(`Server started on port ${port}`));
