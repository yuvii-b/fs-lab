import express from 'express';
import {
    fetchProducts,
    createProduct,
    editProduct, 
    removeProduct
} from '../controller/productController.js';
import {validateProduct} from '../middlewares/validateProduct.js'

const router = express.Router();

router.get("/", fetchProducts);
router.post("/", validateProduct, createProduct);
router.put("/:id", validateProduct, editProduct);
router.delete("/:id", removeProduct);

export default router;