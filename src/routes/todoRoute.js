const express = require("express")
const router = express.Router()
const {verifyToken}= require("../middleware")

router.post("/",verifyToken,(req,res)=>{

})
module.exports = router
