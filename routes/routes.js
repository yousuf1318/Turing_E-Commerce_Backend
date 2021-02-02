const express = require("express");
const router = express.Router();
const knex = require("../controler/database");

require("../model/department")(knex,router);
require("../model/categories")(knex,router);
require("../model/attributes")(knex,router);
require("../model/product")(knex,router);
require("../model/customer")(knex,router);
require("../model/shopping")(knex,router);
require("../model/tax")(knex,router);
require("../model/shipping")(knex,router);
require("../model/orders")(knex,router);


module.exports = router;