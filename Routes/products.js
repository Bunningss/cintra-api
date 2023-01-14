const router = require("express").Router();
const controller = require("../Controller/index");
const middleware = require("../Middleware/index");

router.get("/products", controller.productController.getProducts);
router.get("/product/:id", controller.productController.getProduct);

module.exports = router;
