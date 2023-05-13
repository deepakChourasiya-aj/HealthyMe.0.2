const express= require("express");
const { addProduct, allProducts, getProductById, updateProductsById, deleteProductsById } = require("../controller/product.controller");
const productRoute = express.Router();

// Create a new product
  productRoute.post('/products',addProduct);
  
  // Get all products
  productRoute.get('/products',allProducts);
  
  // Get a single product by ID
  productRoute.get('/products/:id',getProductById);
  
  // Update a product by ID
  productRoute.patch('/products/:id',updateProductsById);
  
  // Delete a product by ID
  productRoute.delete('/products/:id',deleteProductsById);
  
  module.exports = {productRoute};