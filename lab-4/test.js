const getAllProducts = async () => {
    try{
        const response = await fetch("https://fakestoreapi.com/products");
        if(response.ok){
            const data = await response.json();
            console.log(data);
        }else{
            console.log("Error");
        }
    }
    catch(error){
        console.log(error);
    }
}

getAllProducts();

