const { ApiError } = require("../config");

exports.validateBody = (schema,req,next)=>{
    const result = schema.validate(req.body);
     if(result.error){
        return next(new ApiError(409,result.error.details[0].message)) 
    }
    else{
        next()
    }
}
