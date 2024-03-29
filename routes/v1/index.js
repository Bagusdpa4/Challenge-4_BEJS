const router = require("express").Router();

// API Users
const userControllers = require("../../controllers/v1/userControllers");
router.post("/users", userControllers.store);
router.get("/users", userControllers.index);
router.get("/users/:id", userControllers.show);
router.put("/users/:id", userControllers.update);
router.delete("/users/:id", userControllers.destroy);

// API Bank_Account
const accountControllers = require("../../controllers/v1/accountControllers");
router.post("/accounts", accountControllers.register);
router.get("/accounts", accountControllers.index);
router.get("/accounts/:id", accountControllers.show);
router.delete("/accounts/:id", accountControllers.destroy);

// API Transactions

module.exports = router;
