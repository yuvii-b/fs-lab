export const validateProduct = (req, res, next) => {
    const {name, price, quantity} = req.body;
    if(!name || name.trim().length < 2){
        return res.status(400).json({error: "Product name must be atleast 2 characters"});
    }
    if(price === undefined || price <= 0){
        return res.status(400).json({error: "Product price must be greater than zero"});
    }   
    if(quantity === undefined || quantity < 0){
        return res.status(400).json({error: "Product quantity cannot be negative"});
    }
    next();
}