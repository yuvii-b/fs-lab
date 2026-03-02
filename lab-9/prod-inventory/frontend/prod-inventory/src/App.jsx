import React, { useState, useEffect } from "react";
import { getProducts, addProduct, updateProduct, deleteProduct } from "./api";
import ProductForm from "./components/ProductForm";
import ProductGrid from "./components/ProductGrid";
import { Container, TextField, Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchData = async () => {
    const data = await getProducts(search);
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const handleAdd = async (product) => {
    await addProduct(product);
    fetchData();
  };

  const handleUpdate = async (id, product) => {
    await updateProduct(id, product);
    setEditingProduct(null);
    fetchData();
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchData();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        📦 Product Inventory Dashboard
      </Typography>

      <TextField
        label="Search products..."
        variant="outlined"
        fullWidth
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />

      <ProductForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingProduct={editingProduct}
      />

      <ProductGrid
        products={products}
        onEdit={setEditingProduct}
        onDelete={handleDelete}
      />
    </Container>
  );
}

export default App;
