const express = require("express");
const {
  addProduct,
  editProduct,
  deleteProduct,
  getProducts,
} = require("../controller/product_controller");

const authorization = require('../middleware/authorization')

const productRouter = express.Router();

productRouter.post("/add",authorization, addProduct);
productRouter.put("/edit/:id",authorization, editProduct);
productRouter.delete("/delete/:id",authorization, deleteProduct);
productRouter.get("/", getProducts);

module.exports = { productRouter };
