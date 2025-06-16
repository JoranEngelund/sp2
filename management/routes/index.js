var express = require("express");
var router = express.Router();
var express = require("express");
var db = require("../models");
var ManagementService = require("../services/ManagementService");
var managementService = new ManagementService(db);
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

/* GET home page. */
router.get("/querya", async (req, res, next) => {
  try {
    const queryA = await managementService.queryA();
    res.render("querya", { query: queryA });
  } catch (error) {}
});

router.get("/queryb", async (req, res, next) => {
  try {
    const queryB = await managementService.queryB();
    res.render("queryb", { query: queryB });
  } catch (error) {}
});

router.get("/queryc", async (req, res, next) => {
  try {
    const queryC = await managementService.queryC();
    res.render("queryc", { query: queryC });
  } catch (error) {}
});

router.get("/queryd", async (req, res, next) => {
  const queryD = await managementService.queryD();
  res.render("queryd", { query: queryD[0] });
});

router.get("/querye", async (req, res, next) => {
  const queryE = await managementService.queryE();
  res.render("querye", { query: queryE });
});

router.get("/queryf", async (req, res, next) => {
  const queryF = await managementService.queryF();
  res.render("queryf", { query: queryF });
});

router.get("/queryg", async (req, res, next) => {
  const queryG = await managementService.queryG();
  res.render("queryG", { query: queryG });
});

router.get("/queryh", async (req, res, next) => {
  const queryH = await managementService.queryH();
  res.render("queryH", { query: queryH });
});

router.get("/", async (req, res, next) => {
  let options = [
    {
      name: "Query A",
      link: "querya",
      description: "Display the table results for Query A",
    },
    {
      name: "Query B",
      link: "queryb",
      description: "Display the table results for Query B",
    },
    {
      name: "Query C",
      link: "queryc",
      description: "Display the table results for Query C",
    },
    {
      name: "Query D",
      link: "queryd",
      description: "Display the table results for Query D",
    },
    {
      name: "Query E",
      link: "querye",
      description: "Display the table results for Query E",
    },
    {
      name: "Query F",
      link: "queryf",
      description: "Query result for PowerBI visualization",
    },
    {
      name: "Query G",
      link: "queryg",
      description: "Query result for PowerBI visualization",
    },
    {
      name: "Query H",
      link: "queryh",
      description: "Query result for PowerBI visualization",
    },
  ];

  res.render("index", { options: options });
});

module.exports = router;
