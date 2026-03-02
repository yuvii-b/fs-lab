import React, { useState, useEffect } from "react";
import { TextField, Button, Box } from "@mui/material";

function ProductForm({ onAdd, onUpdate, editingProduct }) {
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });

  useEffect(() => {
    if (editingProduct) {
        setForm({ name: editingProduct.name, price: editingProduct.price.toString(), quantity: editingProduct.quantity.toString(), });
    } else {
      setForm({ name: "", price: "", quantity: "" });
    }
  }, [editingProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdate(editingProduct.id, form);
    } else {
      onAdd(form);
    }
    setForm({ name: "", price: "", quantity: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3, display: "flex", gap: 2 }}>
      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <TextField
        label="Price"
        type="number"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        required
      />
      <TextField
        label="Quantity"
        type="number"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        {editingProduct ? "Update" : "Add"}
      </Button>
    </Box>
  );
}

export default ProductForm;
