const router = require("express").Router();

const userControllers = require("../../controllers/v1/userControllers");
router.post("/users", userControllers.store);
router.get("/users", userControllers.index);
router.get("/users/:id", userControllers.show);

module.exports = router;
