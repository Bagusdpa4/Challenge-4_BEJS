const router = require("express").Router();

// API Users
const userControllers = require("../../controllers/v1/userControllers");
router.post("/users", userControllers.store);
router.get("/users", userControllers.index);
router.get("/users/:id", userControllers.show);
router.put("/users/:id", userControllers.update);
router.delete("/users/:id", userControllers.destroy);

// API Bank_Account

// API Transactions

module.exports = router;
