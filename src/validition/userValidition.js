const joi  = require("joi");
exports.signUpValidition=(req,res,next)=>{
    const schema = joi.object({
        email: joi.string().email(),
        password: joi.string().min(6).max(15)
    })
    const result = schema.validate(req.body);
    if(result.error){
        return res.status(409).json({
            statusCode: 409,
            message: result.error.details[0].message
        })
    }
    else{
        next()
    }
}

