const express = require("express");

const router = express.Router();

const { login, Signup, example } = require("../controller/UserHandler");
const { isChecker, auth } = require("../middleware/auth");

const { getAll, Create, update, getFilterd } = require("../model/Product");

router.post("/signUp", Signup);
router.post("/login", login);
router.post("/example", auth, isChecker, example);

//Product
router.post("/Create", auth, isChecker, Create);
router.post("/Update", auth, isChecker, update);
router.get("/getAll", getAll);

router.post("/getFiltered", getFilterd);

module.exports = router;
