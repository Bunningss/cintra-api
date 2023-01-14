const router = require("express").Router();
const controller = require("../Controller/index");

router.post("/register", controller.authController.signup);
router.post("/login", controller.authController.login);

module.exports = router;
