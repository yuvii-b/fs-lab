import {
    getAllProducts,
    addProduct,
    updateProduct,
    deleteProduct
} from '../service/productService.js';

export const fetchProducts = (req, res) => {
    const data = getAllProducts(req.query.search);
    res.json(data);
} 

export const createProduct = (req, res) => {
    const product = addProduct(req.body);
    res.status(201).json(product);
}

export const editProduct = (req, res) => {
    const updated = updateProduct(parseInt(req.params.id, 10), req.body);
    if(!updated){
        return res.status(404).json({error: "Product not found"});
    } 
    res.json(updated);
}

export const removeProduct = (req, res) => {
    const deleted = deleteProduct(parseInt(req.params.id, 10));
    if(!deleted){
        return res.status(404).json({error: "Product not found"});
    }
    res.json({message: "Deleted", data: deleted});
}