import express from 'express';
import dotenv from 'dotenv';
import connectDb from './config/db.js';
import productRoutes from './routes/productRoutes.js'

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

connectDb();

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});