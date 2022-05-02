const express = require("express")
const router = express.Router()
const {signUp,login} = require("../controller");
const { signUpValidition } = require("../validition");

router.post("/",signUpValidition,signUp)
router.post("/login",login)

module.exports = router;
