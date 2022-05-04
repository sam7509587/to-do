const joi  = require("joi");
const { validateBody } = require("../middleware");
exports.signUpValidition=(req,_,next)=>{
    const schema = joi.object({
        email: joi.string().email().trim(),
        password: joi.string().min(6).max(15).trim()
    })
    validateBody(schema,req,next)
}

exports.editUserValidition=(req,_,next)=>{
    const schema = joi.object({
        password: joi.string().min(6).max(15).trim()
    })
    validateBody(schema,req,next)
}
