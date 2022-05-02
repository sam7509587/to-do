const { ApiError } = require(".")

exports.errorHnadler=(err,req,res,next)=>{
        return res.status(err.status).json({
          statusCode: err.status,
          message: err.message,
        });
  
}
