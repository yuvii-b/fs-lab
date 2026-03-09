import Product from "../models/Product.js";

// CREATE
export const addProduct = async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(201).json({ data: product });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

// READ
export const getProducts = async (req, res) => {
    try{    
        const products = await Product.find();
        res.status(200).json({ data: products });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

// UPDATE
export const updateProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if(!product){
            return res.status(404).json({ message: "Product Not Found" });
        }
        res.json({ data: product });
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};

// DELETE
export const deleteProduct = async (req, res) => {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product Not Found" });
       }
       res.json({ message: "Product Deleted Successfully", data: product })
    }catch(error){
        res.status(500).json({ message: error.message });
    }
};