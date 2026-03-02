let products = [];
let productId = 1;

export const getAllProducts = (search) => {
    if(search){
        return products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }
    return products;
}

export const addProduct = (product) => {
    const newProduct = {
        id: productId++,
        ...product
    };
    products.push(newProduct);
    return newProduct;
}

export const updateProduct = (id, data) => {
    const index = products.findIndex(p => p.id === id);
    if(index === -1){
        return null;
    }
    products[index] = {...products[index], ...data};
    return products[index];
} 

export const deleteProduct = (id) => {
    const index = products.findIndex(p => p.id === id);
    if(index === -1) return null;
    return products.splice(index, 1)[0];
}