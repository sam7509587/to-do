const { ApiError } = require("../config");
const { taskValidition ,editTaskValidition} = require("./taskvalidition")
const {signUpValidition,editUserValidition} = require("./userValidition")
const validateId = (req,res,next)=>{
    let {id} = req.params;
     id = id.replace(/['"]+/g, '');
     id = parseInt(id)
     if( Number.isNaN(id) === true){
         return next(new ApiError(409,"id must be number"))
     }
     req.params.id = id
     next()
        
}
module.exports = { signUpValidition,editUserValidition,taskValidition,editTaskValidition ,validateId}
