var express = require("express");
var router = express.Router();
var db = require("../models");
var CustomerService = require("../services/CustomerService");
var customerService = new CustomerService(db);
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* GET home page. */
router.get("/", async function (req, res, next) {
  try {
    const customers = await customerService.getAll();

    if (customers.length === 0) {
      const err = new Error(`No customers found`);
      err.status = 404;
      return res
        .status(404)
        .render("error", { message: err.message, error: err });
    }

    res.render("index", { title: "Customer", customers });
  } catch (error) {}
});

router.get("/:prefix", async (req, res) => {
  const { prefix } = req.params;

  if (!prefix) {
    const err = new Error("No prefix provided");
    err.status = 400;
    return res
      .status(400)
      .render("error", { message: err.message, error: err });
  }

  try {
    const customers = await customerService.getPrefix(prefix);

    if (customers.length === 0) {
      const err = new Error(
        `No customers found with last name starting "${prefix}"`
      );
      err.status = 404;
      return res
        .status(404)
        .render("error", { message: err.message, error: err });
    }

    return res.render("customers", {
      title: "Customers",
      prefix,
      customers,
    });
  } catch (error) {
    console.error("Error in GET /customers/:prefix:", error);
    error.status = error.status || 500;
    return res
      .status(error.status)
      .render("error", { message: error.message, error });
  }
});

module.exports = router;
