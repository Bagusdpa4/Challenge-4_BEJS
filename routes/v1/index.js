const router = require("express").Router();

const userControllers = require("../../controllers/v1/userControllers");
router.post("/users", userControllers.store);
// router.get("/users", userControllers.);
// router.get()

module.exports = router;
