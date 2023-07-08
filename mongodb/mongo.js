const MongoClient = require("mongodb").MongoClient;
require("dotenv").config();

const url = process.env.MONGO_URL;

const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();

    // db 생성
    const result = await db.collection("products").insertOne(newProduct);
    console.log("새로운 제품이 생성되었습니다:", result.insertedId);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "데이터베이스 에러" });
  } finally {
    await client.close();
  }

  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try {
    await client.connect();
    const db = client.db();
    products = await db.collection("products").find().toArray();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "데이터베이스 가져오기 실패" });
  } finally {
    await client.close();
  }

  res.json(products);
};

module.exports = {
  createProduct: createProduct,
  getProducts: getProducts,
};
