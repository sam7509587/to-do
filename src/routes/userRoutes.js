const express = require("express")
const router = express.Router()
const {signUp,login, updateUser} = require("../controller");
const { verifyToken } = require("../middleware/verifyToken");
const { signUpValidition } = require("../validition");

router.post("/",signUpValidition,signUp)
router.post("/login",signUpValidition,login)
router.put("/",verifyToken,updateUser)
module.exports = router;
