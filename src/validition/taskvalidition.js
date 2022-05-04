const joi  = require("joi");
const { validateBody } = require("../middleware");
exports.taskValidition=(req,_,next)=>{
    const schema = joi.object({
        title: joi.string().trim().max(30).required(),
        description: joi.string().max(70).trim().required()
    })
    validateBody(schema,req,next)
}
exports.editTaskValidition=(req,_,next)=>{
    const schema = joi.object({
        title: joi.string().trim().max(30).required(),
        description: joi.string().max(70).trim().required()
    })
    validateBody(schema,req,next)
}
