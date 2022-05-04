const express = require("express")
const router = express.Router()
const { addTask,editTask ,showTask, singleTask,deleteTask ,isCompleted} = require("../controller/todo")
const {verifyToken}= require("../middleware")
const { taskValidition, editTaskValidition, validateId } = require("../validition")

router.post("/",verifyToken,taskValidition,addTask);
router.put("/status/:id",verifyToken,validateId,isCompleted)
router.put("/:id",verifyToken,editTaskValidition,validateId,editTask)
router.get("/:id",verifyToken,validateId,singleTask)
router.get("/",verifyToken,showTask)
router.delete("/:id",verifyToken,validateId,deleteTask)
module.exports = router
