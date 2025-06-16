var express = require("express");
var router = express.Router();
var express = require("express");
var db = require("../models");
var ProductService = require("../services/ProductService");
var productService = new ProductService(db);
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const products = await productService.getAll();

    return res.render("index", { title: "Products", products });
  } catch (error) {}
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    const err = new Error("No ID was provided");
    err.status = 404;
    return res
      .status(404)
      .render("error", { message: err.message, error: err });
  }

  try {
    const productDetail = await productService.getProductDetails(id);

    if (!productDetail) {
      const err = new Error("Product not found");
      err.status = 404;
      return res
        .status(404)
        .render("error", { message: err.message, error: err });
    }
    return res.render("product", {
      title: "Product",
      product: [productDetail],
    });
  } catch (error) {
    const status = error.status || 404;
    error.status = status;
    return res.status(status).render("error", {
      message: error.message,
      error,
    });
  }
});
module.exports = router;
