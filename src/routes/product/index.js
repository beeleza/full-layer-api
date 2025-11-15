const express = require("express");
const router = express.Router();
const ProductController = require("../../controllers/product");

const productController = new ProductController();

router.post("/", (req, res) => productController.create(req, res));
router.get("/", (req, res) => productController.list(req, res));
router.get("/:id", (req, res) => productController.getById(req, res));
router.patch("/:id", (req, res) => productController.update(req, res));
router.delete("/:id", (req, res) => productController.delete(req, res));

module.exports = router;
