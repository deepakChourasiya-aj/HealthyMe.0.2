const { Product } = require("../models/product.model");

const addProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const allProducts = async (req, res) => {
  try {
    let order = req.query;
    if (order.sort === "asc") {
      let product = await Product.find().sort({ price: 1 });
      return res.status(200).json({ msg: "products asc", product });
    } else if (order.sort === "desc") {
      let product = await Product.find().sort({ price: -1 });
      return res.status(200).json({ msg: "products in desc", product });
    } else if (order.category) {
      let category = order.category;
      let product = await Product.find({ category: category });
      return res.status(200).json({ msg: "products in desc", product });
    } else {
      let product = await Product.find({});
      return res.status(200).json({ msg: "all products ", product });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const pagination = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let product = await Product.find()
      .limit(limit)
      .skip((page - 1) * limit);
    res.send({ msg: "products", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
}


const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const products = await Product.findOne({ _id: id });
    res.status(200).json
    ({ msg: "products", products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

const updateProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res
      .status(200)
      .json({ msg: "Product details updated successfully", updatePrduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteProductsById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res
      .status(200)
      .json({ msg: "Product has been deleted successfully", product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  addProduct,
  allProducts,
  getProductById,
  updateProductsById,
  deleteProductsById,
  pagination
};