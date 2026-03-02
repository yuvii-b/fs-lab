import axios from "axios";

const API_URL = "http://localhost:3000/api/products";

export const getProducts = async (search = "") => {
  const res = await axios.get(`${API_URL}?search=${search}`);
  return res.data;
};

export const addProduct = async (product) => {
  const res = await axios.post(API_URL, product);
  return res.data;
};

export const updateProduct = async (id, product) => {
  const res = await axios.put(`${API_URL}/${id}`, product);
  return res.data;
};

export const deleteProduct = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.data;
};
