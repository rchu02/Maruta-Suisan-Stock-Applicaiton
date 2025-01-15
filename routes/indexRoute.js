const express = require("express");
const router = express.Router();
const stockController = require("../controller/stockController")

router.get("/", stockController.getAll);

router.get("/new", stockController.new);

router.get("/:id", stockController.getOne);

router.get("/:id/edit", stockController.edit);

router.post("/new", stockController.create);

router.post("/update/:id", stockController.update);

router.post("/delete/:id", stockController.delete);

module.exports = router;