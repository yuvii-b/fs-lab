import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js'

const PORT = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));