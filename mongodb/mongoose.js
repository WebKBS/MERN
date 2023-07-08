const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/product");

const url = process.env.MONGO_URL;

mongoose
  .connect(url)
  .then(() => {
    console.log("데이터베이스 연결 완료!");
  })
  .catch((error) => {
    console.log(error);
    console.log("데이터베이스 연결 실패");
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save();

  res.json(result);
};
const getProducts = async (req, res, next) => {
  const products = await Product.find().exec();

  res.json(products);
};

module.exports = {
  createProduct: createProduct,
  getProducts: getProducts,
};
