const express = require("express");

const router = express.Router();

const { login, Signup, example } = require("../controller/UserHandler");
const { isChecker, auth } = require("../middleware/auth");

const {
  getAll,
  Create,
  update,
  getFilterd,
} = require("../controller/EmployeeHandler");

const {
  TeamCreate,
  getUserteam,
  deleteBlog,
} = require("../controller/TeamHandler");

router.post("/signUp", Signup);
router.post("/login", login);
router.post("/example", auth, isChecker, example);

//employee
router.post("/Create", auth, isChecker, Create);
router.post("/Update", auth, isChecker, update);
router.get("/getAll", getAll);

//team

router.post("/Team", auth, isChecker, TeamCreate);
router.post("/getUserTeam", auth, isChecker, getUserteam);
router.post("/getFiltered", getFilterd);
router.post("/deleteTeam", auth, isChecker, deleteBlog);

module.exports = router;
